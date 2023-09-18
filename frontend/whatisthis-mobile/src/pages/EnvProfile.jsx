const EnvProfile = () => {
  const PROFILE = process.env.REACT_APP_PROFILE;
  return <div>{PROFILE}</div>;
};

export default EnvProfile;
