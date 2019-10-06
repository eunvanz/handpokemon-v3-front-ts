import { types, SnapshotOut, cast } from 'mobx-state-tree';
import Code from './models/code';
import api from '../api';
import { flow } from '../libs/flow';
import { alertError } from '../libs/hpUtils';

const CodeStore = types
  .model('CodeStore', {
    isCodesLoading: types.optional(types.boolean, false),
    codes: types.optional(types.array(Code), []),
  })
  .actions(self => {
    const fetchCodes = flow(function*() {
      try {
        self.isCodesLoading = true;
        const codes = yield api.code.getCodes();
        self.codes = cast(codes);
      } catch (error) {
        alertError(error);
      } finally {
        self.isCodesLoading = false;
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
        return codes && codes.find(item => item.detailCd === detailCd);
      },
      findMasterCdGroup: (masterCd: string) => {
        return codes && codes.filter(item => item.masterCd === masterCd);
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
