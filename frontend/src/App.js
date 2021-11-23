import './App.css';
import {useEffect, useState} from 'react';
import Login from './components/Login';
import {signOut} from './utils'
import STEVE from "./assets/icon.png";
import NEAR from "./assets/logo-white.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';

function App({ contract, currentUser, nearConfig, wallet }) {
  const [accountId, setAccountId] = useState("");
  const [claim, setClaim] = useState(true);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const [transferAmount, setTransferAmount] = useState(0);
  const [transferAccount, setTransferAccount] = useState("")
  useEffect(() => {
    if(currentUser) {
      setAccountId(currentUser.accountId);
      setLoading(true);
      contract.get_balance().then((balance) => {
        setClaim(true);
        setBalance(balance);
      }).catch((err) => {
        console.log(err);
        setClaim(false);
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [])

  if(!currentUser) {
    return <div>
      <Login wallet={wallet} nearConfig={nearConfig}/>
    </div>
  }

  const clickClaim = () => {
    setLoading(true);
    contract.claim().then(() => {
      contract.get_balance().then((balance) => {
        console.log(balance);
        setBalance(balance);
        setClaim(true);
        toast.success("Claim success!");
      }).finally(() => setLoading(false));
    }).catch(() => {
      setLoading(false);
      toast.error("Claim failed, Has claimed!");
    })
  }

  const transfer = () => {
    setLoading(true);
    contract.transfer({
      receiver_id: transferAccount,
      amount: transferAmount,
    }).then(res => {
      contract.get_balance().then((balance) => {
        setBalance(balance);
        toast.success("Transfer success!");
        setLoading(false);
      })
    }).catch(err => {
      console.log(err)
      toast.error("Transfer failed!");
      setLoading(false);
    })
  }
  
  return (
    <>
    {loading && <Loading />}
    <main className={loading ? "blur": ""}>
      <div className="profile">
        <img src={STEVE} width="300px" height="300px" alt="STEVE" />
        <img src={NEAR} width="300px" height="300px" alt="NEAR" />
      </div>
      <h1>$STEVE Airdrop</h1>
      <div className="nav">
        <h3>Login as {accountId}</h3>
        <button onClick={() => signOut({wallet})}>Logout</button>
      </div>
      <div className="menu">
        <div className="claim">
          {claim ? <p>Amount: 0</p>: <p>Amount: 100</p>}
          {claim ? <p>Has claimed</p>: <button onClick={clickClaim}>Claim</button>}
        </div>
        <div className="balance">
          <p>Balance: {balance}</p>
          <div className="btn-group">
            <div>
              <input 
                type="text" 
                className="input-text" 
                placeholder="Input transfer amount"
                onChange={(e) => {
                  const number = Number.parseInt(e.target.value);
                  setTransferAmount(number);
                }} />
            </div>
            <div>
              <input 
                type="text" 
                className="input-text" 
                placeholder="Input transfer account"
                onChange={(e) => {
                  setTransferAccount(e.target.value);
                }}/>
            </div>
            <button onClick={transfer}>Transfer</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
    </>
  );
}

export default App;
