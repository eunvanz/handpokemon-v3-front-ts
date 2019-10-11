import { types, SnapshotOut, cast } from 'mobx-state-tree';
import Code from './models/code';
import api from '../api';
import { flow } from '../libs/flow';
import { alertError } from '../libs/hpUtils';
import { toJS } from 'mobx';

const CodeStore = types
  .model('CodeStore', {
    isCodeLoaded: types.optional(types.boolean, false),
    codes: types.optional(types.array(Code), []),
  })
  .actions(self => {
    const fetchCodes = flow(function*() {
      try {
        const codes = yield api.code.getCodes();
        self.codes = cast(codes);
        self.isCodeLoaded = true;
      } catch (error) {
        alertError(error);
      }
    });
    return {
      fetchCodes,
      afterCreate: () => {
        fetchCodes();
      },
    };
  })
  .views(self => {
    const { codes } = self;
    return {
      findDetailCdNmByDetailCd: (detailCd: string) => {
        return codes && toJS(codes).find(item => item.detailCd === detailCd);
      },
      findMasterCdGroup: (masterCd: string) => {
        return codes && toJS(codes).filter(item => item.masterCd === masterCd);
      },
      findDetailCdsInMasterCdGroup: (masterCd: string) => {
        return (
          codes &&
          codes
            .filter(item => item.masterCd === masterCd)
            .map(item => item.detailCd)
        );
      },
    };
  });

export type ICodeStore = SnapshotOut<typeof CodeStore>;

export default CodeStore;
