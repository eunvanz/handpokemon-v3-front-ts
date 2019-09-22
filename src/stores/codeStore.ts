import { types } from 'mobx-state-tree';
import Code from './models/code';
import api from '../api';
import { flow } from '../libs/flow';

const CodeStore = types
  .model('CodeStore', {
    isCodesLoading: types.optional(types.boolean, false),
    codes: types.maybe(types.array(Code)),
  })
  .actions(self => ({
    fetchCodes: flow(function*() {
      try {
        self.isCodesLoading = true;
        self.codes = yield api.code.getCodes();
      } catch (error) {
        self.isCodesLoading = false;
        throw error;
      }
    }),
  }))
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

export default CodeStore;
