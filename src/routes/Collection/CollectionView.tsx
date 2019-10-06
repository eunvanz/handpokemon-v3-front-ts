import React, {
  useMemo,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { ICodeInstance, ICodeSnapshotOut } from '../../stores/models/code';
import { ICollectionFilter } from '../../stores/models/collectionFilter';
import { FilterKey } from '../../stores/collectionFilterStore';
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
import { IMonInstance } from '../../stores/models/mon';
import { IUserInstance } from '../../stores/models/user';
import AppContext from '../../contexts/AppContext';
import { useParams } from 'react-router';

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
  const {
    userStore,
    collectionFilterStore,
    codeStore,
    collectionStore,
  } = useContext(AppContext);
  const { user, userCollections } = userStore;
  const { codes } = codeStore;
  const { collectionFilter, updateFilter } = collectionFilterStore;
  const { id } = useParams();
  const { mons } = collectionStore;

  const collections = useMemo(() => {
    if (id === 'user') {
      return userCollections;
    }
  }, [id, userCollections]);

  const selectable = useMemo(() => {
    return false;
  }, []);

  useEffect(() => {
    if (codes && !collectionFilter) {
      collectionFilterStore.setFilter({
        has: [{ label: '보유', value: 'Y' }, { label: '미보유', value: 'N' }],
        gradeCd: (codeStore.findMasterCdGroup(
          MASTER_CD.MON_GRADE
        ) as ICodeSnapshotOut[]).map((item: ICodeSnapshotOut) => ({
          label: item.detailCdNm,
          value: item.detailCd,
        })),
        mainAttrCd: (codeStore.findMasterCdGroup(
          MASTER_CD.MON_ATTRS
        ) as ICodeSnapshotOut[]).map(item => ({
          label: item.detailCdNm,
          value: item.detailCd,
        })),
        subAttrCd: [{ label: '없음', value: '' }].concat(
          (codeStore.findMasterCdGroup(
            MASTER_CD.MON_ATTRS
          ) as ICodeSnapshotOut[]).map(item => ({
            label: item.detailCdNm,
            value: item.detailCd,
          }))
        ),
        cost: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(item => ({
          label: item,
          value: Number(item),
        })),
        rankCd: [{ label: '없음', value: '' }].concat(
          (codeStore.findMasterCdGroup(
            MASTER_CD.MON_RANK
          ) as ICodeSnapshotOut[]).map(item => ({
            label: item.detailCdNm,
            value: item.detailCd,
          }))
        ),
        generation: ['1', '2', '3', '4', '5', '6', '7', '8'].map(item => ({
          label: item,
          value: Number(item),
        })),
        evolutable: [
          { label: '가능', value: 'Y' },
          { label: '불가능', value: 'N' },
        ],
        defense: [
          { label: '배치됨', value: 'Y' },
          { label: '배치안됨', value: 'N' },
        ],
      });
    }
  }, [codes]); // eslint-disable-line

  const monCounts = useMemo(() => {
    if (collections && mons) {
      const result: { total: number; cnt: number; key: string }[] = [];
      getDetailCdsInMasterCdGroup(MASTER_CD.MON_GRADE, codes).forEach(
        (gradeCd: string) => {
          const item = { total: 0, cnt: 0, key: gradeCd };
          item.cnt = collections.filter(
            item => item.mon.gradeCd === gradeCd
          ).length;
          item.total = mons.filter(item => item.gradeCd === gradeCd).length;
          result.push(item);
        }
      );
      return result;
    } else {
      return null;
    }
  }, [mons, codes, collections]);

  const onClickMix = useCallback((targetCol: ICollectionInstance) => {}, []);

  const selectConfigs = useMemo(() => {
    return {
      message: '',
      onSelect: (targetCol: ICollectionInstance) => {},
      onCancel: () => {},
    };
  }, []);

  const isLoading = !codes || !collectionFilter || !collections || !monCounts;

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
    </ContentWrapper>
  );
};

export default observer(CollectionView);
