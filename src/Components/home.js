import Card from "./context";
import Menu from "./menu";
import Bank from "../Images/bank.png";

const Home = () => {
  return (
    <div>
      <Menu />
      <Card
        txtcolor="black"
        header="Welcome to BadBank Portal"
        title="Start your day..."
        text="Using the navigation bar to access each one of your banking features"
        body={<img src={Bank} className="img-fluid" alt="Responsive" />}
      />
    </div>
  );
};

export default Home;
