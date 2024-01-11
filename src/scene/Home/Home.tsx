import "./Home.scss";
import { Header } from "@/components/Header";
import { TitleTextC, TitleTextD } from "@/shared/Typography";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header name="Home" />
      <div className="w-full max-w-xs">
      <TitleTextC className="mb-5">Log file parser</TitleTextC>
        <button onClick={() => navigate("/log-parser")} className="home-button flex items-center justify-center">
          <TitleTextD>Get Started</TitleTextD>
        </button>
      </div>
    </>
  );
}

export default Home;