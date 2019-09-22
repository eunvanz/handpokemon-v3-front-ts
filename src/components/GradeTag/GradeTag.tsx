import React, { CSSProperties } from 'react';
import { Tag } from 'antd';
import classNames from 'classnames';
import { GRADE_STYLE, COLOR } from '../../constants/styles';
import { getClassNameFromGradeCd } from '../../libs/hpUtils';
import './GradeTag.less';
import { TagProps } from 'antd/lib/tag';

interface IGradeTagProps extends TagProps {
  gradeCd?: string;
  style?: CSSProperties;
  isMock?: boolean;
}

const GradeTag = ({ gradeCd, style, isMock, ...restProps }: IGradeTagProps) => {
  return (
    <Tag
      className={classNames(
        'grade-tag',
        isMock ? null : getClassNameFromGradeCd(gradeCd)
      )}
      style={Object.assign(
        {},
        isMock ? null : gradeCd ? GRADE_STYLE[gradeCd] : null,
        style,
        isMock
          ? {
              backgroundColor: COLOR.LIGHT_GRAY,
            }
          : null
      )}
      {...restProps}
    >
      {isMock ? <span>&#10240;&#10240;&#10240;</span> : null}
    </Tag>
  );
};

export default GradeTag;
