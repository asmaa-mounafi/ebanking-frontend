export interface AccountDetails{
  accountId : string,
  balance : number,
  currentPage : number,
  totalPage: number,
  pageSize : number,
  accountOperationDTOS : AccountOperations[]
}





export interface AccountOperations{

  id : number,
  operationDate : Date,
  amount : number,
  type : string,
  description : string

}
