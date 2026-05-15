import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconBed, IconCar, IconBus, IconTrain, IconChevronRight } from '@tabler/icons-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TempleResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [temples, setTemples] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const searchState = location.state || {};
  const destination = searchState.destination || 'Tirupati';
  const dateStr = searchState.date 
    ? new Date(searchState.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) 
    : '12–15 Jun';

  React.useEffect(() => {
    let isMounted = true;
    const fetchTemples = async () => {
      try {
        const mockData = [
          { id: '1', name: 'Sri Venkateswara Temple', location: 'Tirumala Hills, Andhra Pradesh', icon: '🛕' },
          { id: '2', name: 'Padmavathi Ammavari Temple', location: 'Tiruchanur, Tirupati', icon: '🌺' }
        ];

        const querySnapshot = await getDocs(collection(db, 'temples'));
        
        if (isMounted) {
          if (querySnapshot.empty) {
            setTemples(mockData);
          } else {
            const templesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTemples(templesData);
          }
        }
      } catch (error) {
        console.error("Error fetching temples:", error);
        if (isMounted) {
          setTemples([
            { id: '1', name: 'Sri Venkateswara Temple', location: 'Tirumala Hills, Andhra Pradesh', icon: '🛕' },
            { id: '2', name: 'Padmavathi Ammavari Temple', location: 'Tiruchanur, Tirupati', icon: '🌺' }
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTemples();
    return () => { isMounted = false; };
  }, []);

  const nearbyPlacesMap = {
    'Tirupati': [
      { name: 'Srikalahasti', icon: '🕉️' },
      { name: 'Kanipakam', icon: '🐘' },
      { name: 'Chandragiri', icon: '🏰' },
      { name: 'Talakona', icon: '🌊' }
    ],
    'Varanasi': [
      { name: 'Sarnath', icon: '☸️' },
      { name: 'Ramnagar Fort', icon: '🏰' },
      { name: 'Dashashwamedh', icon: '🌅' },
      { name: 'Assi Ghat', icon: '🛶' }
    ],
    'Rameswaram': [
      { name: 'Dhanushkodi', icon: '🏖️' },
      { name: 'Pamban Bridge', icon: '🌉' },
      { name: 'Agni Theertham', icon: '🌊' },
      { name: 'Kothandaramaswamy', icon: '🛕' }
    ],
    'Madurai': [
      { name: 'Meenakshi Temple', icon: '🛕' },
      { name: 'Thirumalai Mahal', icon: '🏛️' },
      { name: 'Alagar Koyil', icon: '🌳' },
      { name: 'Gandhi Museum', icon: '🏛️' }
    ],
    'Kedarnath': [
      { name: 'Badrinath', icon: '🛕' },
      { name: 'Guptkashi', icon: '🏔️' },
      { name: 'Gaurikund', icon: '♨️' },
      { name: 'Tungnath', icon: '⛰️' }
    ]
  };

  const defaultNearby = [
    { name: 'Local Market', icon: '🛍️' },
    { name: 'City Center', icon: '🏙️' },
    { name: 'Historical Site', icon: '🏛️' },
    { name: 'Nature Park', icon: '🌳' }
  ];

  const suggestedNearby = nearbyPlacesMap[destination] || defaultNearby;

  return (
    <div className="min-h-full bg-lightBg flex flex-col pb-[70px] items-center">
      <div className="w-full max-w-3xl flex flex-col w-full relative">
        <div className="sticky top-0 z-40 bg-bgBase/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-goldAmber hover:text-white transition-colors">
            <IconArrowLeft size={24} stroke={1.5} />
          </button>
          <div>
            <h1 className="font-serif text-[20px] text-textPrimary leading-tight">{destination}</h1>
            <p className="text-[11px] text-[#7a5a8a]">{dateStr} · 2 travellers</p>
          </div>
        </div>

        <div className="bg-surfaceElevated px-4 py-6 rounded-b-[24px] mb-6 shadow-md border-b border-borderDefault">
          <h2 className="font-serif text-[20px] text-textPrimary mb-4">Famous Temples</h2>
          
          {loading ? (
            <div className="text-center text-textMuted py-8">Loading temples...</div>
          ) : (
            <div className="space-y-4">
              {temples.map((temple) => (
                <div key={temple.id} className="bg-surface rounded-[14px] border border-borderDefault p-3.5 hover:border-goldAmber/40 transition-colors">
                  <div className="flex gap-3 mb-3">
                    <div className="w-[72px] h-[72px] rounded-[10px] bg-black/40 border border-white/5 flex items-center justify-center text-[32px] shrink-0 shadow-inner" aria-hidden="true">{temple.icon || '🛕'}</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-[18px] text-textPrimary leading-snug mb-1">{temple.name}</h3>
                      <p className="text-[11px] text-textMuted leading-relaxed">{temple.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-2.5 bg-goldAmber hover:bg-yellow-500 transition-colors rounded-[8px] text-black text-[13px] font-semibold tracking-wide">Book Darshan</button>
                    <button className="flex-1 py-2.5 border border-goldAmber/30 hover:bg-goldAmber/10 transition-colors rounded-[8px] text-goldAmber text-[13px] font-medium">Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 mb-8">
          <h2 className="font-serif text-[20px] text-lightText font-medium mb-4">Getting There</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <IconBed size={22} />, title: 'Hotels', sub: `Near ${destination}` },
              { icon: <IconCar size={22} />, title: 'Cabs', sub: 'Local & Outstation', route: '/car-search' },
              { icon: <IconBus size={22} />, title: 'Buses', sub: 'View operators' },
              { icon: <IconTrain size={22} />, title: 'Trains', sub: 'Check schedules' },
            ].map((item, i) => (
              <div key={i} onClick={() => item.route && navigate(item.route, { state: { dropoff: destination } })} className="bg-surfaceElevated rounded-[12px] border border-borderDefault p-3 flex items-center gap-3 shadow-sm cursor-pointer hover:border-goldAmber transition-colors group">
                <div className="text-goldAmber bg-black/30 p-2 rounded-full border border-white/5 group-hover:bg-goldAmber/10 transition-colors">{item.icon}</div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-[13px] font-medium text-lightText truncate">{item.title}</h4>
                  <p className="text-[10px] text-lightSubtext truncate">{item.sub}</p>
                </div>
                <IconChevronRight size={16} className="text-lightSubtext opacity-50 shrink-0 group-hover:text-goldAmber transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="pl-4 pb-8">
          <h2 className="font-serif text-[20px] text-lightText font-medium mb-4">Suggested Nearby</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pr-4">
            {suggestedNearby.map((place, i) => (
              <div key={i} className="min-w-[120px] bg-surfaceElevated rounded-[12px] border border-borderDefault p-2 shrink-0 cursor-pointer hover:border-goldAmber transition-colors group">
                <div className="h-[70px] bg-black/40 border border-white/5 shadow-inner rounded-[8px] mb-2 flex items-center justify-center text-[24px] group-hover:scale-[1.02] transition-transform">
                   {place.icon}
                </div>
                <h4 className="text-[12px] font-medium text-lightText text-center truncate">{place.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleResults;
