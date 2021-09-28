/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TypeListStateKey } from './typings';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface DetailProps { key: TypeListStateKey, title?: string, mode?: number, url?: string }

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Hello: undefined;
  NotFound: undefined;
  Detail: DetailProps;
};

export type DetaiilStackParamList = {
  DetailMode: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Type: undefined;
  Bookmark: undefined;
  User: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
