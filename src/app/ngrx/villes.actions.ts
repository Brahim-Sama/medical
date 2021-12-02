import { Action } from '@ngrx/store';
import { Ville } from '../classes/ville';

export enum VillesActionsTypes {
  GET_ALL_VILLES = '[Villes] get All villes',
  GET_ALL_VILLES_SUCCESS = '[Villes] get All villes Success',
  GET_ALL_VILLES_ERROR = '[Villes] get All villes error',
}

export class GetAllVilleAction implements Action {
  type: VillesActionsTypes = VillesActionsTypes.GET_ALL_VILLES;
  constructor(public payload: any) {}
}

export class GetAllVilleActionSuccess implements Action {
  type: VillesActionsTypes = VillesActionsTypes.GET_ALL_VILLES_SUCCESS;
  constructor(public payload: Ville[]) {}
}

export class GetAllVilleActionError implements Action {
  type: VillesActionsTypes = VillesActionsTypes.GET_ALL_VILLES_ERROR;
  constructor(public payload: string) {}
}

export type VillesActions =
  | GetAllVilleAction
  | GetAllVilleActionError
  | GetAllVilleActionSuccess;
