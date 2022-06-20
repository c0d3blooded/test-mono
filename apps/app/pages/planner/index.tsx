import { useState } from 'react';
import PlannerSidebarLeft from '../../components/planner/sidebar-left';
import PlannerSidebarRight from '../../components/planner/sidebar-right';

const Planner = () => {
  const [sidebarOpenLeft, setSidebarOpenLeft] = useState(false);
  const [sidebarOpenRight, setSidebarOpenRight] = useState(false);

  return (
    <div className="min-h-screen w-screen flex">
      {/* left sidebar */}
      <PlannerSidebarLeft
        showMobile={sidebarOpenLeft}
        onClose={() => setSidebarOpenLeft(false)}
      />
      {/* content */}
      <div className="w-full flex-1 flex flex-col">
        {/* dashboard body */}
        <main>Planner</main>
      </div>
      {/* right sidebar */}
      <PlannerSidebarRight
        showMobile={sidebarOpenRight}
        onClose={() => setSidebarOpenRight(false)}
      />
    </div>
  );
};

export default Planner;
