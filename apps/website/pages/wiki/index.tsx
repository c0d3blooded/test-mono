import WikiHomeMdx from '../../mdx/wiki/home.mdx';
import WikiContainer from '../../components/wiki/container';

const WikiHome = () => {
  return (
    <WikiContainer>
      <div className="flex flex-col items-center">
        <div className="flex flex-col text-center items-center p-4 lg:w-5/6">
          <WikiHomeMdx />
        </div>
      </div>
    </WikiContainer>
  );
};

export default WikiHome;
