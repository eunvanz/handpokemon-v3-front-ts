import React, { useContext, useCallback, useState, useEffect } from 'react';
import AppContext from '../../contexts/AppContext';
import api from '../../api';
import SignUpView from './SignUpView';
import { Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import SpinContainer from '../../components/SpinContainer';
import MessageModal from '../../components/MessageModal/index';
import { MessageModalType } from '../../components/MessageModal/MessageModal';
import { useHistory } from 'react-router';
import { ICollection } from '../../stores/models/collectionModel';

const SignUpContainer = ({ form }: { form: WrappedFormUtils }) => {
  const history = useHistory();
  const { userStore, codeStore } = useContext(AppContext);
  const [startPicks, setStartPicks] = useState<ICollection[] | undefined>(
    undefined
  );
  const { codes } = codeStore;

  useEffect(() => {
    codeStore.fetchCodes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkDupEmail = useCallback((email: string) => {
    return api.user.isDupEmail(email);
  }, []);

  const checkDupNickname = useCallback((nickname: string) => {
    return api.user.isDupNickname(nickname);
  }, []);

  const handleOnPick = useCallback(async () => {
    const startPicks = await api.collection.getStartPicks();
    return setStartPicks(startPicks);
  }, []);

  const handleOnSubmit = useCallback(() => {
    return form.validateFields(async (err, values) => {
      if (!err) {
        // 프로필 사진이 있을경우 업로드
        let requestPostFile;
        if (values.profileImage && values.profileImage[0]) {
          const fileObj = values.profileImage[0].originFileObj;
          const formData = new FormData();
          formData.append('file', fileObj);
          requestPostFile = () =>
            api.file.postFile({ data: formData, path: 'profie-images' });
        } else {
          requestPostFile = () => Promise.resolve(null);
        }
        const res = await requestPostFile();
        const user = { ...values, profileImage: res ? res.url : null };
        await userStore.signUp(user);
        history.push('/pick');
        MessageModal({
          type: MessageModalType.success,
          title: '회원가입 완료',
          content:
            '정식 포켓몬 트레이너가 되었습니다. 포켓몬 채집부터 시작해볼까요?',
        });
      }
    });
  }, [form, history, userStore]);

  if (!codes) {
    return <SpinContainer />;
  }
  return (
    <SignUpView
      form={form}
      checkDupEmail={checkDupEmail}
      checkDupNickname={checkDupNickname}
      codes={codes}
      onPick={handleOnPick}
      startPicks={startPicks}
      onSubmit={handleOnSubmit}
    />
  );
};

export default Form.create()(SignUpContainer);
