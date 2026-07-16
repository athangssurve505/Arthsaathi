import FeatureItem from "../../../features/auth/Components/FeatureItem";
import Icon from "../../../shared/Components/Icon";

import ShieldImage from "../../../assets/images/auth/ShieldImage.webp";
import Logo from "../../../shared/Components/Logo";

export default function AuthLeftSide() {
  const styles = {
    container:
      "hide-scrollbar flex flex-col overflow-y-auto justify-between h-full  p-10 min-w-150 bg-[#001718] max-xl:hidden  text-white ",

    heading: "text-5xl font-bold leading-tight ",

    highlight: "block text-[#0E8B5D]",

    description: "mt-2 text-lg font-bold  max-w-md leading-8",

    featureList: "flex flex-col gap-8 mt-10",

    imageWrapper: "flex justify-center items-end mt-12",

    image:
      "w-[320px] object-contain drop-shadow-2xl select-none pointer-events-none",
  };

  

  return (
    <section className={styles.container}>
      <Logo className={"mb-20"}/>
      <div>
        <h1 className={styles.heading}>
          Empower Your
          <span className={styles.highlight}>Financial Journey</span>
        </h1>

        <p className={styles.description}>
          Access AI-powered financial guidance, personalized planning, and
          secure tools to help you make smarter financial decisions.
        </p>

        <div className={styles.featureList}>
          <FeatureItem
            icon={"RiChat4Line"}
            title={"AI Financial Coach"}
            description={
              "Receive personalized financial guidance based on your goals and profile."
            }
          />

          <FeatureItem
            icon="RiFundsLine"
            title="Smart Goal Planning"
            description="Create, monitor, and achieve your savings and investment goals."
          />

          <FeatureItem
            icon="RiBarChartGroupedLine"
            title="Financial Insights"
            description="Track spending habits and monitor your financial progress effortlessly."
          />

          <FeatureItem
            icon="RiShieldCheckLine"
            title="Safe & Secure"
            description="Your personal data stays encrypted and protected at every step."
          />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={ShieldImage}
          alt="Financial Security"
          className={styles.image}
        />
      </div>
    </section>
  );
}
