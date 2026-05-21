export interface IPropsTest {
  propsA: string;
  propsB: boolean;
  propC?: () => void;
}

const PropDefinition = (props: IPropsTest) => {
  const { propsA, propsB } = props;

  return (
    <div>
      PropDefinition
      <h1>{propsA}</h1>
      <h1>{propsB}</h1>
    </div>
  );
};

export default PropDefinition;
