import { observable, flow, action } from 'mobx';
import { ICode } from './models/codeModel';
import api from '../api/index';
import { alertError } from '../libs/hpUtils';

export default class CodeStore {
  @observable codes?: ICode[] = undefined;

  constructor() {
    this.fetchCodes();
  }

  fetchCodes = flow(function*(this: CodeStore) {
    try {
      const codes = yield api.code.getCodes();
      this.codes = codes;
    } catch (error) {
      alertError(error);
    }
  });

  @action
  findDetailCdNmByDetailCd = (detailCd: string) => {
    return this.codes && this.codes.find(item => item.detailCd === detailCd);
  };

  @action
  findMasterCdGroup = (masterCd: string) => {
    return this.codes && this.codes.filter(item => item.masterCd === masterCd);
  };

  @action
  findDetailCdsInMasterCdGroup = (masterCd: string) => {
    return (
      this.codes &&
      this.codes
        .filter(item => item.masterCd === masterCd)
        .map(item => item.detailCd)
    );
  };
}
