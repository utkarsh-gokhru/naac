import naac_logo from '../../naac_logo.png';

const Heading = () => {
  return (
    <div className="border border-slate-400">
      <div className="flex">
        <div>
          <img src={naac_logo} className="w-[30%]" alt="NAAC LOGO" />
        </div>
        <div className="my-1 ">
          <h1 className='text-center'>University of Mumbai AQAR Platform</h1>
        </div>
      </div>
      <div>
        <h1 className="bg-slate-200">Yearly Status Report - Part B(Download)</h1>
      </div>
    </div>
  );
};

export default Heading;