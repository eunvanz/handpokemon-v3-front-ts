import React, {
  useMemo,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { ICodeInstance } from '../../stores/models/code';
import { ICollectionInstance } from '../../stores/models/collection';
import ContentWrapper from '../../components/ContentWrapper/index';
import SpinContainer from '../../components/SpinContainer';
import { Card, Row, Col, Progress } from 'antd';
import {
  getDetailCdsInMasterCdGroup,
  getDetailCdNmByDetailCd,
} from '../../libs/codeUtils';
import { MASTER_CD } from '../../constants/codes';
import { GRADE_STYLE } from '../../constants/styles';
import CollectionList from '../../components/CollectionList';
import { observer } from 'mobx-react';
import AppContext from '../../contexts/AppContext';
import { useParams } from 'react-router';
import FloatingFilterDrawer from '../../components/FloatingFilterDrawer';
import { toJS } from 'mobx';

interface ICollectionStateSectionProps {
  codes: ICodeInstance[];
  monCounts: any[];
}

const CollectionStateSection = ({
  codes,
  monCounts,
}: ICollectionStateSectionProps) => {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Row gutter={6}>
        {getDetailCdsInMasterCdGroup(MASTER_CD.MON_GRADE, codes).map(
          (gradeCd: string) => (
            <Col
              xs={8}
              lg={4}
              className='text-center'
              style={{ margin: '6px 0' }}
              key={gradeCd}
            >
              <Progress
                type='circle'
                percent={
                  (monCounts.filter(item => item.key === gradeCd)[0].cnt *
                    100) /
                  monCounts.filter(item => item.key === gradeCd)[0].total
                }
                format={() =>
                  `${monCounts.filter(item => item.key === gradeCd)[0].cnt} / ${
                    monCounts.filter(item => item.key === gradeCd)[0].total
                  }`
                }
                strokeColor={GRADE_STYLE[gradeCd].backgroundColor}
                width={80}
                strokeWidth={4}
              />
              <h3 style={{ marginBottom: 0 }}>
                {getDetailCdNmByDetailCd(gradeCd, codes)}
              </h3>
            </Col>
          )
        )}
      </Row>
    </Card>
  );
};

export interface ISelectConfigs {
  message: ReactNode;
  onSelect: (targetCol: ICollectionInstance) => void;
  onCancel: () => void;
}

const CollectionView = () => {
  const { userStore, codeStore, collectionStore } = useContext(AppContext);
  const { id } = useParams();
  const { user, userCollections } = userStore;
  const { codes, isCodeLoaded } = codeStore;
  const { mons, collections } = collectionStore;

  const selectable = useMemo(() => {
    return false;
  }, []);

  const monCounts = useMemo(() => {
    if (collections && mons && codes) {
      const result: { total: number; cnt: number; key: string }[] = [];
      (codeStore.findDetailCdsInMasterCdGroup(
        MASTER_CD.MON_GRADE
      ) as string[]).forEach((gradeCd: string) => {
        const item = { total: 0, cnt: 0, key: gradeCd };
        item.cnt = collections.filter(
          item => item.mon.gradeCd === gradeCd
        ).length;
        item.total = mons.filter(item => item.gradeCd === gradeCd).length;
        result.push(item);
      });
      return result;
    } else {
      return null;
    }
  }, [mons, codeStore, collections, codes]);

  const selectConfigs = useMemo(() => {
    return {
      message: '',
      onSelect: (targetCol: ICollectionInstance) => {},
      onCancel: () => {},
    };
  }, []);

  const onClickMix = useCallback((targetCol: ICollectionInstance) => {}, []);

  useEffect(() => {
    if (id === 'user') {
      userCollections && collectionStore.setCollections(toJS(userCollections));
    }
  }, [id, userCollections, collectionStore]);

  const isLoading = !isCodeLoaded || !collections || !monCounts;

  return (
    <ContentWrapper>
      {isLoading && <SpinContainer />}
      {monCounts && codes && !selectable && (
        <CollectionStateSection codes={codes} monCounts={monCounts} />
      )}
      {codes && collections && user && (
        <CollectionList
          selectable={selectable}
          selectConfigs={selectConfigs}
          list={collections}
          codes={codes}
          onClickMix={onClickMix}
          user={user}
        />
      )}
      <FloatingFilterDrawer />
    </ContentWrapper>
  );
};

export default observer(CollectionView);
