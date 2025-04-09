type HeadingProps = {
  title: string;
  subtitle: string;
};

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="heading">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Heading;
