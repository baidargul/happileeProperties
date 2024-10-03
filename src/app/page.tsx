import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";
import "@/app/global.css";

export const metadata = {
  title: "Homy - Real Estate React Next js Template",
};
const index = () => {
  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  );
};

export default index;
