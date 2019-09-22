interface ICreditRuleArgs {
  required?: boolean;
  requiredMessage?: string;
  customValidator?:
    | ((
        rule: any,
        value: any,
        callback: any,
        source?: any,
        options?: any
      ) => any)
    | undefined;
}

export const createRule = ({
  required = false,
  requiredMessage = '필수항목입니다.',
  customValidator,
}: ICreditRuleArgs) => ({
  emailRule: [
    {
      required,
      message: requiredMessage || '이메일주소를 입력해주세요.',
    },
    {
      type: 'email',
      message: '이메일주소 형식이 아닙니다.',
    },
    {
      validator: customValidator,
    },
  ],
  passwordRule: [
    {
      required: true,
      message: requiredMessage || '비밀번호를 입력해주세요.',
    },
    {
      min: 6,
      max: 20,
      message: '6~20자리로 입력해주세요.',
    },
    {
      validator: customValidator,
    },
  ],
  nicknameRule: [
    {
      required: true,
      message: '닉네임을 입력해주세요.',
    },
    {
      min: 1,
      max: 8,
      message: '1~8자리로 입력해주세요.',
    },
    {
      validator: customValidator,
    },
  ],
});
