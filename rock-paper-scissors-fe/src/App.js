import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { signOut } from './utils'
import STEVE from "./assets/icon.png";
import NEAR from "./assets/logo-white.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import animation from './assets/animation.gif'
import Rock from './assets/rock.png';
import Paper from './assets/paper.png';
import Scissors from './assets/scissors.png';

function App({ contract, currentUser, nearConfig, wallet }) {
  const [accountId, setAccountId] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);

  const [choose, setChoose] = useState(-1);
  const [computerChoose, setComputerChoose] = useState(-1);

  useEffect(() => {
    if (currentUser) {
      setAccountId(currentUser.accountId);
      setLoading(true);
      contract.get_balance().then((balance) => {
        setBalance(balance);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [])

  if (!currentUser) {
    return <div>
      <Login wallet={wallet} nearConfig={nearConfig} />
    </div>
  }

  const chooseSigniture = (choose0) => {
    // 0 1 2 rock paper scissors
    setChoose(choose0);
    // 0 1 2 rock paper scissors
    const computerChoose0 = Math.floor(Math.random() * 3);
    setComputerChoose(computerChoose0);

    if (choose0 === computerChoose0) {
      toast.warning("Tie!");
    } else if ((choose0 === 0 && computerChoose0 === 2) || (choose0 === 1 && computerChoose0 === 0) || (choose0 === 2 && computerChoose0 === 1)) {
      toast.success("You win!");
      setLoadingScore(true);
      contract.win().then(() => {
        contract.get_balance().then((balance) => {
          setBalance(balance);
          setLoadingScore(false);
        })
      }).catch((err) => {
        setLoadingScore(false);
        toast.error('Network not stable, update score failed');
      })
    } else {
      toast.error("You lose!");
      setLoadingScore(true);
      contract.lose().then(() => {
        contract.get_balance().then((balance) => {
          setBalance(balance);
          setLoadingScore(false);
        })
      }).catch((err) => {
        setLoadingScore(false);
        toast.error('Network not stable, update score failed');
      })
    }
  }

  let buttonGroup = <>
    {choose === -1 && <div className="btn-group">
      <button onClick={() => chooseSigniture(0)}>ROCK</button>
      <button onClick={() => chooseSigniture(1)}>PAPER</button>
      <button onClick={() => chooseSigniture(2)}>SCISSORS</button>
    </div>}
    {choose !== -1 && <div className="btn-group">
      <button onClick={() => { setChoose(-1); setComputerChoose(-1) }}>RESTART</button>
    </div>}
  </>

  if (loadingScore) {
    buttonGroup = <button disabled>
      loading...
    </button>
  }
  return (
    <>
      {loading && <Loading />}
      <main className={loading ? "blur" : ""}>
        <div className="profile">
          <img src={STEVE} width="200px" height="200px" alt="STEVE" />
          <img src={NEAR} width="200px" height="200px" alt="NEAR" />
        </div>
        <h1>Rock paper scissors</h1>
        <div className="nav">
          <h3>Login as {accountId}</h3>
          <button onClick={() => signOut({ wallet })}>Logout</button>
        </div>
        {balance < 10 &&
          <div style={{marginTop: '20px'}}>
            <p>
              <strong>
                If you don't have $STEVE, claim from <a href="https://www.steveyuowo.com/airdrop">
                  <strong>
                    <font className="coral">here</font>
                  </strong>
                </a>.
                Then you can start game.
              </strong>
            </p>
          </div>}
        {balance >= 10 && <div className="menu">
          <div className="balance">
            {loadingScore && <p style={{ marginTop: 20 }}>Fetch balance, waiting...</p>}
            {!loadingScore && <p style={{ marginTop: 20 }}>Balance: {balance}</p>}
            <div className="game-view">
              <div>Player</div>
              <div>
                {choose === -1 && <img src={animation} width={100} height={100} alt="animation" />}
                {choose === 0 && <img src={Rock} width={100} height={100} alt="rock" />}
                {choose === 1 && <img src={Paper} width={100} height={100} alt="paper" />}
                {choose === 2 && <img src={Scissors} width={100} height={100} alt="scissors" />}
              </div>
              <div>
                {computerChoose === -1 && <img style={{ transform: 'rotateY(180deg)' }} src={animation} width={100} height={100} alt="animation" />}
                {computerChoose === 0 && <img style={{ transform: 'rotateY(180deg)' }} src={Rock} width={100} height={100} alt="rock" />}
                {computerChoose === 1 && <img style={{ transform: 'rotateY(180deg)' }} src={Paper} width={100} height={100} alt="paper" />}
                {computerChoose === 2 && <img style={{ transform: 'rotateY(180deg)' }} src={Scissors} width={100} height={100} alt="scissors" />}
              </div>
              <div>Computer</div>
            </div>
            {buttonGroup}
          </div>
        </div>}
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
