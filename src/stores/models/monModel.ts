export interface IMon {
  id: number;
  name: string;
  cost: number;
  mainAttrCd: string;
  subAttrCd?: string;
  prevMonId?: number;
  gradeCd: string;
  description: string;
  generation: number;
  height: number;
  weight: number;
  point: number;
  hp: number;
  power: number;
  armor: number;
  dex: number;
  sPower: number;
  sArmor: number;
  total: number;
  requiredLv?: number;
  createdAt: string;
  updatedAt: string;
}
