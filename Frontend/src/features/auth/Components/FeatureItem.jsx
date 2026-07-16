import Icon from "../../../shared/Components/Icon";

export default function FeatureItem({
  icon,
  title,
  description,
}) {
  const styles = {
    container: "flex items-start gap-4",

    iconWrapper:
      "w-14 h-14 rounded-full bg-[#EAF6F1] flex items-center justify-center text-[#0E8B5D] shrink-0",

    content: "flex flex-col",

    title: "text-xl font-semibold text-white",

    description:
      "text-md text-gray-400 font-semibold leading-6 mt-1 max-w-[260px]",
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {<Icon name={icon} className="w-8 h-8"/>}
      </div>

      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </div>
  );
}