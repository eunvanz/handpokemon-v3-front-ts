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
import { isCollection } from '../../libs/hpUtils';
import { toJS } from 'mobx';
import { clone } from 'mobx-state-tree';

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
                  (monCounts.find(item => item.key === gradeCd).cnt * 100) /
                  monCounts.find(item => item.key === gradeCd).total
                }
                format={() =>
                  `${monCounts.find(item => item.key === gradeCd).cnt} / ${
                    monCounts.find(item => item.key === gradeCd).total
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
  const {
    userStore,
    codeStore,
    collectionStore,
    collectionFilterStore,
  } = useContext(AppContext);
  const { id } = useParams();
  const { user, userCollections } = userStore;
  const { codes, isCodeLoaded } = codeStore;
  const { mons, collections } = collectionStore;
  const { collectionFilter } = collectionFilterStore;

  const selectable = useMemo(() => {
    return false;
  }, []);

  const monCounts = useMemo(() => {
    if (collections && mons && codes) {
      console.log('collections', collections.toJSON());
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
  }, [mons, codeStore, codes, collections]);

  console.log('monCounts', monCounts);

  const selectConfigs = useMemo(() => {
    return {
      message: '',
      onSelect: (targetCol: ICollectionInstance) => {},
      onCancel: () => {},
    };
  }, []);

  const onClickMix = useCallback((targetCol: ICollectionInstance) => {}, []);

  useEffect(() => {
    if (id === 'user' && userCollections) {
      collectionStore.setCollections(toJS(userCollections));
    }
  }, [id, userCollections, collectionStore]);

  const isLoading = !isCodeLoaded || !collections || !monCounts;

  const list = useMemo(() => {
    console.log('collectionFilter', collectionFilter);
    if (collectionFilter)
      console.log(
        'collectionFilter',
        collectionStore.getFilteredList(collectionFilter)
      );
    return collectionFilter
      ? collectionStore.getFilteredList(collectionFilter)
      : collections;
  }, [collectionFilter, collectionStore, collections]);

  console.log('list', list);

  return (
    <ContentWrapper>
      {isLoading && <SpinContainer />}
      {collections && monCounts && codes && !selectable && (
        <CollectionStateSection codes={codes} monCounts={monCounts} />
      )}
      {codes && collections && user && (
        <CollectionList
          selectable={selectable}
          selectConfigs={selectConfigs}
          list={list}
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
