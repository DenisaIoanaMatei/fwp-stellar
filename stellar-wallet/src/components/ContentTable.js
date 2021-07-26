import React, {useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import AccountService from '../services/accountService.stellar.js'


export default function ContentTable(props) {
  const user = props.user
  const accounts = user.accounts.map(account => { return account.pub_key })
  const [data, setData] = useState([])

  async function fetchAccountBalances(account) {
    return AccountService.getBalance(account)
      .then((res) => {
        const result = res[0].map((el) => {
          return [el.asset_type, el.balance]
        })
        return result
      })
    
  }

  useEffect(() => {
    async function fetchData() {
      const balances = []
      const acc = accounts
      for (let a of acc){
        let result = await fetchAccountBalances(a)
        result = await result
        console.log(result)
        balances.push(a)
        balances.push(result.slice())
      }
      
      setData(balances)
    }
    fetchData()
  }, [])

  const tableData = user.accounts.map((item, i) => {
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{item.accountId}</td>
        <td>{item.pub_key}</td>
      </tr>
    )
  })

  function buildTableRow(item, i) {
    let children = []
    if (typeof item === 'string' || item instanceof String) {
      children.push(<td key={i} colSpan="2">{`${item}`}</td>)
    }
    console.log(typeof(item))
    if (typeof item === 'object' || item instanceof Object) {
      for (let x = 0; x < item.length; x++) {
        children.push(<td key={x}>{`${item[x][0]}`}</td>)
        children.push(<td key={x}>{`${item[x][1]}`}</td>)
      }
    }
    return (<tr key={i}>{children}</tr>)
  }

  console.log(data)
  const balanceData = data.map((item, i) => {
    console.log('item')
    console.log(item)
    const row = buildTableRow(item, i)
    console.log(row)
    return row
  })

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Account Id</th>
            <th>Public Key</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </Table>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="2">Account Id</th>
          </tr>
          <tr>
            <th>Asset Type</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {balanceData}
        </tbody>
      </Table>
    </>
  )

}