import {IStyleAPI, IStyleItem, IMatcherFunction, IComparatorFunction} from "import-sort-style";
import {IImport} from "import-sort-parser";

export default function(styleApi: IStyleAPI): Array<IStyleItem> {
  const {
    isAbsoluteModule,
    isRelativeModule,
    member,
    name,
    naturally,
    moduleName
  } = styleApi;

  const isAngularImport: IMatcherFunction = (iImport: IImport) => iImport.moduleName.indexOf("@angular") === 0;
  const isCore: IMatcherFunction = (iImport: IImport) => iImport.moduleName.indexOf("edyt-core") === 0;
  const isPapyrus: IMatcherFunction = (iImport: IImport) => iImport.moduleName.indexOf("teampatent-papyrus") === 0;
  const isThirdParty: IMatcherFunction = (iImport: IImport) => isAbsoluteModule(iImport) && !isCore(iImport) && !isPapyrus(iImport);

  const moduleAndThanName = (comparator: IComparatorFunction) => {
    const moduleNameSorter = moduleName(comparator),
      memberNameSorter = member(comparator);

    const sorter = (import1: IImport, import2: IImport) => {
      const moduleNamesCompared = moduleNameSorter(import1, import2);
      if (moduleNamesCompared !== 0) {
        return moduleNamesCompared;
      }
      return memberNameSorter(import1, import2);
    };
    return sorter;
  }

  return [
    // angular
    {match: isAngularImport, sort: moduleAndThanName(naturally), sortNamedMembers: name(naturally)},
    {separator: true},

    // other third party
    {match: isThirdParty, sort: moduleAndThanName(naturally), sortNamedMembers: name(naturally)},
    {separator: true},

    // core
    {match: isCore, sort: moduleAndThanName(naturally), sortNamedMembers: name(naturally)},
    {separator: true},

    // papyrus
    {match: isPapyrus, sort: moduleAndThanName(naturally), sortNamedMembers: name(naturally)},
    {separator: true},

    // current module
    {match: isRelativeModule, sort: moduleAndThanName(naturally), sortNamedMembers: name(naturally)},
    {separator: true}
  ];
}
