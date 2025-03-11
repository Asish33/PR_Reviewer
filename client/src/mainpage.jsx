import Button from "../components/githubButton";

const Mainpage = () => {
  function Redirect() {
    window.location.href = "https://pr-mqz2.onrender.com/auth/github";
  }
  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <Button onClick={Redirect} />
    </div>
  );
};

export default Mainpage;
