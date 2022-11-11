export interface ZTERouterExecutor<Action, DefaultReturnType> {
  execute<ReturnType = DefaultReturnType>(action: Action): Promise<ReturnType>;
  connect(
    password: string
  ): Promise<ZTERouterExecutor<Action, DefaultReturnType>>;
}
