import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// Using backend REST API instead of Firebase for admin operations
const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const monthlyRevenue = [
  { month: "Nov", revenue: 18400 },
  { month: "Dec", revenue: 31200 },
  { month: "Jan", revenue: 24800 },
  { month: "Feb", revenue: 19600 },
  { month: "Mar", revenue: 28900 },
  { month: "Apr", revenue: 33800 },
];

const mockData = {
  temples: [
    { id: "t1", name: "Tirupati Balaji", location: "Andhra Pradesh", status: "active", visitors: 12400 },
    { id: "t2", name: "Vaishno Devi", location: "Jammu & Kashmir", status: "active", visitors: 8900 },
    { id: "t3", name: "Kedarnath", location: "Uttarakhand", status: "seasonal", visitors: 5600 },
    { id: "t4", name: "Shirdi Sai Baba", location: "Maharashtra", status: "active", visitors: 9200 },
    { id: "t5", name: "Somnath Temple", location: "Gujarat", status: "active", visitors: 4100 },
  ],
  hotels: [
    { id: "h1", name: "Yatra Residency Tirupati", location: "Tirupati", rooms: 48, price: 1800, status: "active" },
    { id: "h2", name: "Divine Stay Rishikesh", location: "Rishikesh", rooms: 32, price: 2400, status: "active" },
    { id: "h3", name: "Char Dham Guest House", location: "Haridwar", rooms: 20, price: 1200, status: "maintenance" },
    { id: "h4", name: "Shirdi Pilgrims Inn", location: "Shirdi", rooms: 60, price: 1600, status: "active" },
  ],
  buses: [
    { id: "b1", route: "Hyderabad → Tirupati", seats: 40, departure: "06:00 AM", price: 650, status: "active" },
    { id: "b2", route: "Delhi → Haridwar", seats: 45, departure: "09:30 PM", price: 480, status: "active" },
    { id: "b3", route: "Mumbai → Shirdi", seats: 35, departure: "10:00 PM", price: 390, status: "active" },
    { id: "b4", route: "Chennai → Tirupati", seats: 40, departure: "11:00 PM", price: 420, status: "inactive" },
  ],
  cars: [
    { id: "c1", model: "Toyota Innova", type: "SUV", seats: 7, pricePerKm: 18, status: "available" },
    { id: "c2", model: "Swift Dzire", type: "Sedan", seats: 4, pricePerKm: 12, status: "booked" },
    { id: "c3", model: "Tempo Traveller", type: "Van", seats: 12, pricePerKm: 22, status: "available" },
    { id: "c4", model: "Maruti Ertiga", type: "MPV", seats: 7, pricePerKm: 15, status: "available" },
  ],
  blogs: [
    { id: "bl1", title: "Best Time to Visit Kedarnath", author: "Admin", date: "2024-03-10", status: "published", views: 3400, content: "" },
    { id: "bl2", title: "Complete Guide to Char Dham Yatra", author: "Admin", date: "2024-03-18", status: "published", views: 7800, content: "" },
    { id: "bl3", title: "Tirupati Darshan Tips 2024", author: "Admin", date: "2024-04-02", status: "draft", views: 0, content: "" },
    { id: "bl4", title: "Vaishno Devi Helicopter Booking", author: "Admin", date: "2024-04-08", status: "published", views: 5100, content: "" },
  ],
  users: [
    { id: "u1", name: "Ramesh Kumar", email: "ramesh@gmail.com", joined: "2024-01-15", bookings: 4, status: "active" },
    { id: "u2", name: "Priya Sharma", email: "priya.s@yahoo.com", joined: "2024-02-03", bookings: 2, status: "active" },
    { id: "u3", name: "Ajay Verma", email: "ajay.v@gmail.com", joined: "2024-02-28", bookings: 1, status: "active" },
    { id: "u4", name: "Sunita Devi", email: "sunita@hotmail.com", joined: "2024-03-12", bookings: 6, status: "suspended" },
    { id: "u5", name: "Mohan Lal", email: "mohan.l@gmail.com", joined: "2024-03-29", bookings: 3, status: "active" },
  ],
  bookings: [
    { id: "BK001", user: "Ramesh Kumar", type: "Temple", item: "Tirupati Balaji", date: "2024-04-20", amount: 2450, status: "confirmed", phone: "9876543210" },
    { id: "BK002", user: "Priya Sharma", type: "Hotel", item: "Yatra Residency Tirupati", date: "2024-04-22", amount: 3600, status: "pending", phone: "9845012345" },
    { id: "BK003", user: "Ajay Verma", type: "Bus", item: "Hyderabad → Tirupati", date: "2024-04-25", amount: 1300, status: "confirmed", phone: "9900112233" },
    { id: "BK004", user: "Sunita Devi", type: "Car", item: "Toyota Innova", date: "2024-04-18", amount: 5400, status: "completed", phone: "9123456789" },
    { id: "BK005", user: "Mohan Lal", type: "Temple", item: "Vaishno Devi", date: "2024-05-01", amount: 1800, status: "pending", phone: "9988776655" },
    { id: "BK006", user: "Ramesh Kumar", type: "Hotel", item: "Divine Stay Rishikesh", date: "2024-05-03", amount: 4800, status: "confirmed", phone: "9876543210" },
    { id: "BK007", user: "Priya Sharma", type: "Bus", item: "Mumbai → Shirdi", date: "2024-04-30", amount: 780, status: "cancelled", phone: "9845012345" },
    { id: "BK008", user: "Mohan Lal", type: "Car", item: "Maruti Ertiga", date: "2024-05-05", amount: 3000, status: "pending", phone: "9988776655" },
  ],
};

const statusColors = {
  active: { bg: "#eaf3de", text: "#3b6d11", dot: "#639922" },
  inactive: { bg: "#f1efe8", text: "#5f5e5a", dot: "#888780" },
  seasonal: { bg: "#faeeda", text: "#854f0b", dot: "#ba7517" },
  maintenance: { bg: "#faeeda", text: "#854f0b", dot: "#ba7517" },
  available: { bg: "#eaf3de", text: "#3b6d11", dot: "#639922" },
  booked: { bg: "#e6f1fb", text: "#185fa5", dot: "#378add" },
  published: { bg: "#eaf3de", text: "#3b6d11", dot: "#639922" },
  draft: { bg: "#f1efe8", text: "#5f5e5a", dot: "#888780" },
  suspended: { bg: "#fcebeb", text: "#a32d2d", dot: "#e24b4a" },
  confirmed: { bg: "#eaf3de", text: "#3b6d11", dot: "#639922" },
  pending: { bg: "#faeeda", text: "#854f0b", dot: "#ba7517" },
  completed: { bg: "#e6f1fb", text: "#185fa5", dot: "#378add" },
  cancelled: { bg: "#fcebeb", text: "#a32d2d", dot: "#e24b4a" },
};

const Badge = ({ status }) => {
  const c = statusColors[status] || statusColors.inactive;
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 12, padding: "3px 10px", borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 500 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const PIE_COLORS = ["#ba7517", "#378add", "#639922", "#d85a30"];

const navItems = [
  { id: "dashboard", icon: "ti-layout-dashboard", label: "Dashboard" },
  { id: "bookings", icon: "ti-calendar-check", label: "Bookings" },
  { id: "temples", icon: "ti-building-arch", label: "Temples" },
  { id: "hotels", icon: "ti-building", label: "Hotels" },
  { id: "buses", icon: "ti-bus", label: "Buses" },
  { id: "cars", icon: "ti-car", label: "Cars" },
  { id: "blogs", icon: "ti-article", label: "Blogs" },
  { id: "users", icon: "ti-users", label: "Users" },
];

export default function YatraAdmin() {
  const [active, setActive] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [temples, setTemples] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);
  const [cars, setCars] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(null);
  const [bookingFilter, setBookingFilter] = useState("all");
  const [bookingSearch, setBookingSearch] = useState("");
  const [blogForm, setBlogForm] = useState(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notifText, setNotifText] = useState("");
  const [notifSent, setNotifSent] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [loading, setLoading] = useState(true);

  const emptyBlog = { title: "", author: "Admin", date: new Date().toISOString().slice(0, 10), status: "draft", views: 0, content: "" };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bkRes, tRes, pRes, bRes] = await Promise.all([
        fetch(`${API}/bookings`).then(r => r.json()),
        fetch(`${API}/temples`).then(r => r.json()),
        fetch(`${API}/plans`).then(r => r.json()),
        fetch(`${API}/blogs`).then(r => r.json())
      ]);

      // Normalize bookings: ensure status exists
      const normalizedBookings = bkRes.map(b => ({
        ...b,
        user_details: b.user_details || {},
        status: b.status || (b.user_details && b.user_details.status) || 'pending'
      }));

      setBookings(normalizedBookings);
      setTemples(tRes);
      setHotels([]); // no hotels API yet
      setBuses([]);
      setCars([]);
      setBlogs(bRes);
      setUsers([]);
      showToast('Loaded data from backend');
    } catch (err) {
      console.error('Error fetching data:', err);
      showToast('Error loading data from backend', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedDatabase = async () => {
    if (!window.confirm('This will upload all mock data to your backend database. Are you sure?')) return;
    setIsSeeding(true);
    try {
      const res = await fetch(`${API}/seed`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mockData) });
      if (!res.ok) throw new Error('Seed failed');
      showToast('Database seeded successfully!');
      await fetchData();
    } catch (err) {
      console.error('Error seeding database:', err);
      showToast('Failed to seed database', 'danger');
    } finally {
      setIsSeeding(false);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const booking = bookings.find(b => b.id === id);
      const user_details = { ...(booking.user_details || {}), status: newStatus };
      const res = await fetch(`${API}/bookings/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: booking.item_id, item_type: booking.item_type, user_details })
      });
      if (!res.ok) throw new Error('update failed');
      setBookings(prev => prev.map(b => b.id === id ? { ...b, user_details, status: newStatus } : b));
      showToast(`Booking ${id} marked as ${newStatus}`);
    } catch (err) {
      showToast('Failed to update status', 'danger');
    }
  };

  const deleteItem = async (colName, setter, id) => {
    try {
      let endpoint = `${API}/${colName}/${id}`;
      // map frontend collection names to API paths if needed
      if (colName === 'users') { showToast('User delete not supported', 'danger'); return; }
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('delete failed');
      setter(prev => prev.filter(x => x.id !== id));
      showToast('Record deleted', 'danger');
    } catch (err) {
      showToast('Failed to delete record', 'danger');
    }
  };

  const toggleStatus = async (colName, setter, id, currentStatus, on = "active", off = "inactive", field = "status") => {
    const newStatus = currentStatus === on ? off : on;
    try {
      // For bookings, store status inside user_details; for other collections, try PUT endpoint
      if (colName === 'bookings') {
        const booking = bookings.find(b => b.id === id);
        const user_details = { ...(booking.user_details || {}), status: newStatus };
        const res = await fetch(`${API}/bookings/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item_id: booking.item_id, item_type: booking.item_type, user_details }) });
        if (!res.ok) throw new Error('update failed');
        setter(prev => prev.map(x => x.id === id ? { ...x, user_details, status: newStatus } : x));
      } else {
        // optimistic update locally; backend may not have status column
        setter(prev => prev.map(x => x.id === id ? { ...x, [field]: newStatus } : x));
      }
      showToast('Status updated');
    } catch (err) {
      showToast('Failed to update status', 'danger');
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "User", "Type", "Item", "Date", "Amount", "Status", "Phone"];
    const rows = bookings.map(b => [b.id, b.user, b.type, b.item, b.date, b.amount, b.status, b.phone]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "yatra_bookings.csv"; a.click();
    showToast("Bookings exported as CSV");
  };

  const sendNotification = () => {
    if (!notifText.trim()) return;
    setNotifSent(true);
    setNotifText("");
    showToast(`Announcement sent to ${users.filter(u => u.status === "active").length} users`);
    setTimeout(() => setNotifSent(false), 3000);
  };

  const totalRevenue = bookings.filter(b => b.status !== "cancelled").reduce((s, b) => s + b.amount, 0);
  const pendingCount = bookings.filter(b => b.status === "pending").length;
  const activeUsers = users.filter(u => u.status === "active").length;

  const bookingTypeData = ["Temple", "Hotel", "Bus", "Car"].map(t => ({
    name: t, value: bookings.filter(b => b.type === t).length
  })).filter(d => d.value > 0);

  const topTemples = [...temples].sort((a, b) => b.visitors - a.visitors).slice(0, 3);

  const alerts = [
    ...(pendingCount > 0 ? [{ type: "warning", msg: `${pendingCount} bookings awaiting confirmation`, action: "bookings" }] : []),
    ...(hotels.some(h => h.status === "maintenance") ? [{ type: "warning", msg: "Char Dham Guest House is under maintenance", action: "hotels" }] : []),
    ...(buses.some(b => b.status === "inactive") ? [{ type: "info", msg: "1 bus route is currently inactive", action: "buses" }] : []),
    ...(blogs.some(b => b.status === "draft") ? [{ type: "info", msg: `${blogs.filter(b => b.status === "draft").length} blog(s) pending publish`, action: "blogs" }] : []),
  ];

  const filteredBookings = bookings
    .filter(b => bookingFilter === "all" || b.status === bookingFilter)
    .filter(b => !bookingSearch || b.user?.toLowerCase().includes(bookingSearch.toLowerCase()) || b.id?.toLowerCase().includes(bookingSearch.toLowerCase()) || b.item?.toLowerCase().includes(bookingSearch.toLowerCase()));

  const s = {
    wrap: { display: "flex", height: "100vh", fontFamily: "var(--font-sans)", fontSize: 14, background: "var(--color-background-tertiary)", overflow: "hidden" },
    sidebar: { width: 200, background: "var(--color-background-primary)", borderRight: "0.5px solid var(--color-border-tertiary)", display: "flex", flexDirection: "column", flexShrink: 0 },
    logo: { padding: "20px 16px 12px", borderBottom: "0.5px solid var(--color-border-tertiary)" },
    logoText: { fontSize: 16, fontWeight: 500, color: "#ba7517", letterSpacing: "-0.3px" },
    logoSub: { fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 },
    nav: { flex: 1, padding: "8px 0", overflowY: "auto" },
    navItem: (isActive) => ({ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", cursor: "pointer", color: isActive ? "#ba7517" : "var(--color-text-secondary)", background: isActive ? "#faeeda" : "transparent", fontWeight: isActive ? 500 : 400, fontSize: 13, borderLeft: isActive ? "2px solid #ba7517" : "2px solid transparent", transition: "all 0.15s" }),
    main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
    topbar: { background: "var(--color-background-primary)", borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    content: { flex: 1, padding: 24, overflowY: "auto" },
    statGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 },
    statCard: (accent) => ({ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "14px 16px", borderLeft: `3px solid ${accent}` }),
    statLabel: { fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6 },
    statVal: { fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" },
    card: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: 20 },
    cardHead: { padding: "14px 18px", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", justifyContent: "space-between" },
    cardTitle: { fontWeight: 500, fontSize: 14 },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { padding: "10px 16px", textAlign: "left", fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, borderBottom: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-secondary)" },
    td: { padding: "10px 16px", borderBottom: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-primary)", fontSize: 13 },
    btn: (variant = "default") => ({
      padding: "5px 12px", borderRadius: "var(--border-radius-md)", fontSize: 12, fontWeight: 500, cursor: "pointer", border: "0.5px solid",
      ...(variant === "danger" ? { borderColor: "#e24b4a", color: "#a32d2d", background: "#fcebeb" } :
          variant === "success" ? { borderColor: "#639922", color: "#3b6d11", background: "#eaf3de" } :
          variant === "warning" ? { borderColor: "#ba7517", color: "#854f0b", background: "#faeeda" } :
          variant === "info" ? { borderColor: "#378add", color: "#185fa5", background: "#e6f1fb" } :
          { borderColor: "var(--color-border-secondary)", color: "var(--color-text-secondary)", background: "var(--color-background-secondary)" })
    }),
    filterBtn: (isActive) => ({ padding: "5px 14px", borderRadius: 99, fontSize: 12, cursor: "pointer", fontWeight: isActive ? 500 : 400, border: "0.5px solid", borderColor: isActive ? "#ba7517" : "var(--color-border-tertiary)", color: isActive ? "#854f0b" : "var(--color-text-secondary)", background: isActive ? "#faeeda" : "var(--color-background-primary)" }),
    emptyRow: { textAlign: "center", padding: 32, color: "var(--color-text-tertiary)", fontSize: 13 },
    toggle: (on) => ({ width: 40, height: 22, borderRadius: 99, background: on ? "#639922" : "#b4b2a9", cursor: "pointer", position: "relative", border: "none", padding: 0, flexShrink: 0 }),
    toggleDot: (on) => ({ position: "absolute", top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left 0.2s" }),
  };

  const SectionHeader = ({ title, count }) => (
    <div style={{ marginBottom: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
      <h2 style={{ fontWeight: 500, fontSize: 16, margin: 0 }}>{title}</h2>
      {count !== undefined && <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{count} records</span>}
    </div>
  );

  const renderDashboard = () => (
    <>
      <SectionHeader title="Overview" />

      {maintenanceMode && (
        <div style={{ background: "#faeeda", border: "0.5px solid #ef9f27", borderRadius: "var(--border-radius-md)", padding: "10px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#633806" }}>
          <i className="ti ti-tool" aria-hidden="true" />
          <strong>Maintenance mode is ON</strong> — App and website are showing a maintenance screen to users.
        </div>
      )}

      {bookings.length === 0 && temples.length === 0 && !loading && (
        <div style={{ background: "#f1efe8", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "16px", marginBottom: 20, textAlign: "center" }}>
          <h3 style={{ margin: "0 0 8px 0", color: "var(--color-text-primary)" }}>Your Firebase database is empty</h3>
          <p style={{ margin: "0 0 12px 0", color: "var(--color-text-secondary)", fontSize: 13 }}>Seed your live database with the initial mock data to populate the charts and tables.</p>
          <button style={s.btn("success")} onClick={seedDatabase} disabled={isSeeding}>
            {isSeeding ? "Seeding..." : "Seed Database Now"}
          </button>
        </div>
      )}

      <div style={s.statGrid}>
        {[
          { label: "Total bookings", val: bookings.length, icon: "ti-calendar", accent: "#ba7517" },
          { label: "Total revenue", val: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: "ti-coin-rupee", accent: "#639922" },
          { label: "Pending approvals", val: pendingCount, icon: "ti-clock", accent: pendingCount > 0 ? "#e24b4a" : "#888780" },
          { label: "Active users", val: activeUsers, icon: "ti-users", accent: "#378add" },
        ].map(c => (
          <div key={c.label} style={s.statCard(c.accent)}>
            <div style={s.statLabel}><i className={`ti ${c.icon}`} aria-hidden="true" /> {c.label}</div>
            <div style={s.statVal}>{loading ? "..." : c.val}</div>
          </div>
        ))}
      </div>

      {alerts.length > 0 && (
        <div style={{ ...s.card, border: "0.5px solid #fac775" }}>
          <div style={s.cardHead}>
            <span style={{ ...s.cardTitle, color: "#854f0b" }}><i className="ti ti-alert-triangle" style={{ marginRight: 6 }} aria-hidden="true" />Alerts ({alerts.length})</span>
          </div>
          {alerts.map((a, i) => (
            <div key={i} style={{ padding: "10px 18px", borderBottom: i < alerts.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <i className={`ti ${a.type === "warning" ? "ti-alert-circle" : "ti-info-circle"}`} style={{ color: a.type === "warning" ? "#ba7517" : "#378add" }} aria-hidden="true" />
                {a.msg}
              </div>
              <button style={s.btn()} onClick={() => setActive(a.action)}>View →</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}><span style={s.cardTitle}>Monthly revenue (₹)</span></div>
          <div style={{ padding: "16px 8px 8px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyRevenue} barSize={28}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${Math.round(v / 1000)}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid var(--color-border-secondary)" }} />
                <Bar dataKey="revenue" fill="#ba7517" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}><span style={s.cardTitle}>Booking breakdown by type</span></div>
          <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
            {bookingTypeData.length > 0 ? (
              <>
                <PieChart width={150} height={150}>
                  <Pie data={bookingTypeData} cx={70} cy={70} innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                    {bookingTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v + " bookings", n]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </PieChart>
                <div style={{ flex: 1 }}>
                  {bookingTypeData.map((d, i) => (
                    <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[i], display: "inline-block" }} />
                        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{d.name}</span>
                      </div>
                      <span style={{ fontWeight: 500, fontSize: 13 }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, textAlign: "center", padding: "40px 0", color: "var(--color-text-tertiary)", fontSize: 13 }}>No booking data available</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}><span style={s.cardTitle}>Top temples by visitors</span></div>
          {topTemples.length > 0 ? topTemples.map((t, i) => (
            <div key={t.id} style={{ padding: "10px 18px", borderBottom: i < topTemples.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#faeeda", color: "#ba7517", fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{t.location}</div>
                </div>
              </div>
              <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{t.visitors?.toLocaleString("en-IN") || 0}/mo</span>
            </div>
          )) : <div style={{ padding: 20, textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 13 }}>No temples data</div>}
        </div>

        <div style={s.card}>
          <div style={s.cardHead}><span style={s.cardTitle}>Recent bookings</span></div>
          {bookings.length > 0 ? bookings.slice(0, 4).map((b, i) => (
            <div key={b.id} style={{ padding: "10px 18px", borderBottom: i < 3 ? "0.5px solid var(--color-border-tertiary)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{b.user}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{b.type} · {b.item}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Badge status={b.status} />
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 3 }}>₹{b.amount?.toLocaleString("en-IN") || 0}</div>
              </div>
            </div>
          )) : <div style={{ padding: 20, textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 13 }}>No recent bookings</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={s.card}>
            <div style={{ ...s.cardHead, alignItems: "center" }}>
              <div>
                <div style={s.cardTitle}>Maintenance mode</div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{maintenanceMode ? "App is offline for users" : "App is live"}</div>
              </div>
              <button style={s.toggle(maintenanceMode)} onClick={() => { setMaintenanceMode(m => !m); showToast(maintenanceMode ? "Maintenance mode OFF — app is live" : "Maintenance mode ON — app is now offline for users", maintenanceMode ? "success" : "danger"); }} aria-label="Toggle maintenance mode">
                <span style={s.toggleDot(maintenanceMode)} />
              </button>
            </div>
          </div>

          <div style={s.card}>
            <div style={s.cardHead}><span style={s.cardTitle}>Send announcement</span></div>
            <div style={{ padding: "12px 18px" }}>
              <textarea
                value={notifText}
                onChange={e => setNotifText(e.target.value)}
                placeholder="Write message for all app users..."
                rows={3}
                style={{ width: "100%", boxSizing: "border-box", resize: "none", fontFamily: "var(--font-sans)", fontSize: 12, padding: "8px 10px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", marginBottom: 8 }}
              />
              <button style={{ ...s.btn("success"), width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: 6, padding: "8px", boxSizing: "border-box" }} onClick={sendNotification}>
                <i className="ti ti-send" aria-hidden="true" />
                {notifSent ? "Sent!" : `Send to ${activeUsers} users`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={s.card}>
        <div style={s.cardHead}><span style={s.cardTitle}>Collection summary</span><span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Click row to navigate</span></div>
        <table style={s.table}>
          <thead><tr>
            <th style={s.th}>Collection</th><th style={s.th}>Total</th><th style={s.th}>Active / Live</th><th style={s.th}>Inactive / Offline</th>
          </tr></thead>
          <tbody>
            {[
              { name: "Temples", nav: "temples", total: temples.length, active: temples.filter(x => x.status === "active").length, inactive: temples.filter(x => x.status !== "active").length },
              { name: "Hotels", nav: "hotels", total: hotels.length, active: hotels.filter(x => x.status === "active").length, inactive: hotels.filter(x => x.status !== "active").length },
              { name: "Buses", nav: "buses", total: buses.length, active: buses.filter(x => x.status === "active").length, inactive: buses.filter(x => x.status !== "active").length },
              { name: "Cars", nav: "cars", total: cars.length, active: cars.filter(x => x.status === "available").length, inactive: cars.filter(x => x.status !== "available").length },
              { name: "Blogs", nav: "blogs", total: blogs.length, active: blogs.filter(x => x.status === "published").length, inactive: blogs.filter(x => x.status !== "published").length },
              { name: "Users", nav: "users", total: users.length, active: users.filter(x => x.status === "active").length, inactive: users.filter(x => x.status !== "active").length },
            ].map(r => (
              <tr key={r.name} style={{ cursor: "pointer" }} onClick={() => setActive(r.nav)}>
                <td style={{ ...s.td, fontWeight: 500 }}>{r.name}</td>
                <td style={s.td}>{r.total}</td>
                <td style={s.td}><span style={{ color: "#3b6d11", fontWeight: 500 }}>{r.active}</span></td>
                <td style={s.td}><span style={{ color: r.inactive > 0 ? "#a32d2d" : "var(--color-text-tertiary)" }}>{r.inactive}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderBookings = () => (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <h2 style={{ fontWeight: 500, fontSize: 16, margin: 0 }}>Bookings</h2>
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{filteredBookings.length} records</span>
        </div>
        <button style={{ ...s.btn(), display: "flex", alignItems: "center", gap: 6, padding: "7px 14px" }} onClick={exportCSV}>
          <i className="ti ti-download" style={{ fontSize: 14 }} aria-hidden="true" /> Export CSV
        </button>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 280 }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "var(--color-text-tertiary)", pointerEvents: "none" }} aria-hidden="true" />
          <input type="text" placeholder="Search user, ID, item..." value={bookingSearch} onChange={e => setBookingSearch(e.target.value)} style={{ paddingLeft: 32, width: "100%", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "pending", "confirmed", "completed", "cancelled"].map(f => (
            <button key={f} style={s.filterBtn(bookingFilter === f)} onClick={() => setBookingFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div style={s.card}>
        <table style={s.table}>
          <thead><tr>
            <th style={s.th}>Booking ID</th><th style={s.th}>User</th><th style={s.th}>Type</th><th style={s.th}>Item</th><th style={s.th}>Date</th><th style={s.th}>Amount</th><th style={s.th}>Status</th><th style={s.th}>Actions</th>
          </tr></thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr><td colSpan={8} style={s.emptyRow}>No bookings found</td></tr>
            ) : filteredBookings.map(b => (
              <tr key={b.id}>
                <td style={{ ...s.td, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{b.id}</td>
                <td style={s.td}><div style={{ fontWeight: 500 }}>{b.user}</div><div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{b.phone}</div></td>
                <td style={s.td}>{b.type}</td>
                <td style={{ ...s.td, maxWidth: 140 }}>{b.item}</td>
                <td style={{ ...s.td, fontSize: 12, color: "var(--color-text-secondary)" }}>{b.date}</td>
                <td style={{ ...s.td, fontWeight: 500 }}>₹{b.amount?.toLocaleString("en-IN") || 0}</td>
                <td style={s.td}><Badge status={b.status} /></td>
                <td style={s.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {b.status === "pending" && <><button style={s.btn("success")} onClick={() => updateBookingStatus(b.id, "confirmed")}>Confirm</button><button style={s.btn("danger")} onClick={() => updateBookingStatus(b.id, "cancelled")}>Cancel</button></>}
                    {b.status === "confirmed" && <button style={s.btn("info")} onClick={() => updateBookingStatus(b.id, "completed")}>Complete</button>}
                    {(b.status === "completed" || b.status === "cancelled") && <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>—</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderTemples = () => (
    <><SectionHeader title="Temples" count={temples.length} /><div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Name</th><th style={s.th}>Location</th><th style={s.th}>Monthly visitors</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead><tbody>{temples.map(t => (<tr key={t.id}><td style={{ ...s.td, fontWeight: 500 }}>{t.name}</td><td style={s.td}>{t.location}</td><td style={s.td}>{t.visitors?.toLocaleString("en-IN") || 0}</td><td style={s.td}><Badge status={t.status} /></td><td style={s.td}><div style={{ display: "flex", gap: 6 }}><button style={s.btn(t.status === "active" ? "warning" : "success")} onClick={() => toggleStatus("temples", setTemples, t.id, t.status, "active", "inactive")}>{t.status === "active" ? "Deactivate" : "Activate"}</button><button style={s.btn("danger")} onClick={() => deleteItem("temples", setTemples, t.id)}>Delete</button></div></td></tr>))}</tbody></table></div></>
  );

  const renderHotels = () => (
    <><SectionHeader title="Hotels" count={hotels.length} /><div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Name</th><th style={s.th}>Location</th><th style={s.th}>Rooms</th><th style={s.th}>Price/night</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead><tbody>{hotels.map(h => (<tr key={h.id}><td style={{ ...s.td, fontWeight: 500 }}>{h.name}</td><td style={s.td}>{h.location}</td><td style={s.td}>{h.rooms}</td><td style={s.td}>₹{h.price}</td><td style={s.td}><Badge status={h.status} /></td><td style={s.td}><div style={{ display: "flex", gap: 6 }}><button style={s.btn(h.status === "active" ? "warning" : "success")} onClick={() => toggleStatus("hotels", setHotels, h.id, h.status, "active", "inactive")}>{h.status === "active" ? "Deactivate" : "Activate"}</button><button style={s.btn("danger")} onClick={() => deleteItem("hotels", setHotels, h.id)}>Delete</button></div></td></tr>))}</tbody></table></div></>
  );

  const renderBuses = () => (
    <><SectionHeader title="Buses" count={buses.length} /><div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Route</th><th style={s.th}>Departure</th><th style={s.th}>Seats</th><th style={s.th}>Price</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead><tbody>{buses.map(b => (<tr key={b.id}><td style={{ ...s.td, fontWeight: 500 }}>{b.route}</td><td style={s.td}>{b.departure}</td><td style={s.td}>{b.seats}</td><td style={s.td}>₹{b.price}</td><td style={s.td}><Badge status={b.status} /></td><td style={s.td}><div style={{ display: "flex", gap: 6 }}><button style={s.btn(b.status === "active" ? "warning" : "success")} onClick={() => toggleStatus("buses", setBuses, b.id, b.status, "active", "inactive")}>{b.status === "active" ? "Deactivate" : "Activate"}</button><button style={s.btn("danger")} onClick={() => deleteItem("buses", setBuses, b.id)}>Delete</button></div></td></tr>))}</tbody></table></div></>
  );

  const renderCars = () => (
    <><SectionHeader title="Cars" count={cars.length} /><div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Model</th><th style={s.th}>Type</th><th style={s.th}>Seats</th><th style={s.th}>₹/km</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead><tbody>{cars.map(c => (<tr key={c.id}><td style={{ ...s.td, fontWeight: 500 }}>{c.model}</td><td style={s.td}>{c.type}</td><td style={s.td}>{c.seats}</td><td style={s.td}>₹{c.pricePerKm}</td><td style={s.td}><Badge status={c.status} /></td><td style={s.td}><div style={{ display: "flex", gap: 6 }}><button style={s.btn(c.status === "available" ? "warning" : "success")} onClick={() => toggleStatus("cars", setCars, c.id, c.status, "available", "inactive")}>{c.status === "available" ? "Mark unavailable" : "Mark available"}</button><button style={s.btn("danger")} onClick={() => deleteItem("cars", setCars, c.id)}>Delete</button></div></td></tr>))}</tbody></table></div></>
  );

  const saveBlog = async () => {
    if (!blogForm.title.trim()) { showToast("Title is required", "danger"); return; }
    try {
      if (blogForm.id) { 
        await updateDoc(doc(db, "blogs", blogForm.id), blogForm);
        setBlogs(prev => prev.map(b => b.id === blogForm.id ? { ...blogForm } : b)); 
        showToast("Blog updated"); 
      }
      else { 
        const newBlog = { ...blogForm, views: 0 };
        const docRef = await addDoc(collection(db, "blogs"), newBlog);
        setBlogs(prev => [{ ...newBlog, id: docRef.id }, ...prev]); 
        showToast("Blog created"); 
      }
      setBlogForm(null);
    } catch (err) {
      showToast("Failed to save blog", "danger");
    }
  };

  const renderBlogs = () => (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}><h2 style={{ fontWeight: 500, fontSize: 16, margin: 0 }}>Blogs</h2><span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{blogs.length} records</span></div>
        <button style={{ ...s.btn("success"), display: "flex", alignItems: "center", gap: 6, padding: "7px 14px" }} onClick={() => setBlogForm({ ...emptyBlog })}><i className="ti ti-plus" style={{ fontSize: 14 }} aria-hidden="true" /> New blog</button>
      </div>
      {blogForm && (
        <div style={{ ...s.card, marginBottom: 20, border: "0.5px solid #c0dd97" }}>
          <div style={{ padding: "12px 18px", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#eaf3de" }}>
            <span style={{ fontWeight: 500, fontSize: 14, color: "#3b6d11" }}><i className={`ti ${blogForm.id ? "ti-edit" : "ti-plus"}`} style={{ marginRight: 6 }} aria-hidden="true" />{blogForm.id ? "Edit blog" : "New blog"}</span>
            <button style={{ ...s.btn(), padding: "4px 10px", fontSize: 12 }} onClick={() => setBlogForm(null)}><i className="ti ti-x" aria-hidden="true" /> Cancel</button>
          </div>
          <div style={{ padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}><label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Title *</label><input type="text" value={blogForm.title} onChange={e => setBlogForm(f => ({ ...f, title: e.target.value }))} placeholder="Enter blog title" style={{ width: "100%", boxSizing: "border-box" }} /></div>
            <div><label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Author</label><input type="text" value={blogForm.author} onChange={e => setBlogForm(f => ({ ...f, author: e.target.value }))} style={{ width: "100%", boxSizing: "border-box" }} /></div>
            <div><label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Date</label><input type="date" value={blogForm.date} onChange={e => setBlogForm(f => ({ ...f, date: e.target.value }))} style={{ width: "100%", boxSizing: "border-box" }} /></div>
            <div><label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Status</label><select value={blogForm.status} onChange={e => setBlogForm(f => ({ ...f, status: e.target.value }))} style={{ width: "100%", boxSizing: "border-box" }}><option value="draft">Draft</option><option value="published">Published</option></select></div>
            <div style={{ gridColumn: "1 / -1" }}><label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Content</label><textarea value={blogForm.content || ""} onChange={e => setBlogForm(f => ({ ...f, content: e.target.value }))} placeholder="Write blog content here..." rows={5} style={{ width: "100%", boxSizing: "border-box", resize: "vertical", fontFamily: "var(--font-sans)", fontSize: 13, padding: "8px 12px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} /></div>
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 8 }}><button style={{ ...s.btn(), padding: "8px 18px" }} onClick={() => setBlogForm(null)}>Cancel</button><button style={{ ...s.btn("success"), padding: "8px 18px" }} onClick={saveBlog}><i className={`ti ${blogForm.id ? "ti-device-floppy" : "ti-plus"}`} style={{ marginRight: 5 }} aria-hidden="true" />{blogForm.id ? "Save changes" : "Create blog"}</button></div>
          </div>
        </div>
      )}
      <div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Title</th><th style={s.th}>Author</th><th style={s.th}>Date</th><th style={s.th}>Views</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead><tbody>{blogs.map(b => (<tr key={b.id} style={{ background: blogForm?.id === b.id ? "#faeeda22" : "transparent" }}><td style={{ ...s.td, fontWeight: 500, maxWidth: 220 }}>{b.title}</td><td style={{ ...s.td, fontSize: 12, color: "var(--color-text-secondary)" }}>{b.author}</td><td style={{ ...s.td, fontSize: 12, color: "var(--color-text-secondary)" }}>{b.date}</td><td style={s.td}>{b.views?.toLocaleString("en-IN") || 0}</td><td style={s.td}><Badge status={b.status} /></td><td style={s.td}><div style={{ display: "flex", gap: 6 }}><button style={s.btn("info")} onClick={() => setBlogForm({ ...b })}><i className="ti ti-edit" style={{ fontSize: 12, marginRight: 4 }} aria-hidden="true" />Edit</button><button style={s.btn(b.status === "published" ? "warning" : "success")} onClick={() => toggleStatus("blogs", setBlogs, b.id, b.status, "published", "draft")}>{b.status === "published" ? "Unpublish" : "Publish"}</button><button style={s.btn("danger")} onClick={() => deleteItem("blogs", setBlogs, b.id)}>Delete</button></div></td></tr>))}</tbody></table></div>
    </>
  );

  const renderUsers = () => (
    <><SectionHeader title="Users" count={users.length} /><div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>Joined</th><th style={s.th}>Bookings</th><th style={s.th}>Status</th><th style={s.th}>Actions</th></tr></thead><tbody>{users.map(u => (<tr key={u.id}><td style={{ ...s.td, fontWeight: 500 }}>{u.name}</td><td style={{ ...s.td, fontSize: 12, color: "var(--color-text-secondary)" }}>{u.email}</td><td style={{ ...s.td, fontSize: 12, color: "var(--color-text-secondary)" }}>{u.joined}</td><td style={s.td}>{u.bookings}</td><td style={s.td}><Badge status={u.status} /></td><td style={s.td}><div style={{ display: "flex", gap: 6 }}><button style={s.btn(u.status === "active" ? "danger" : "success")} onClick={() => toggleStatus("users", setUsers, u.id, u.status, "active", "suspended")}>{u.status === "active" ? "Suspend" : "Restore"}</button><button style={s.btn()} onClick={() => deleteItem("users", setUsers, u.id)}>Delete</button></div></td></tr>))}</tbody></table></div></>
  );

  const sections = { dashboard: renderDashboard, bookings: renderBookings, temples: renderTemples, hotels: renderHotels, buses: renderBuses, cars: renderCars, blogs: renderBlogs, users: renderUsers };
  const pageTitle = navItems.find(n => n.id === active)?.label || "Dashboard";

  return (
    <div style={s.wrap}>
      <aside style={s.sidebar}>
        <div style={s.logo}>
          <div style={s.logoText}>🕉 Yatra Admin</div>
          <div style={s.logoSub}>Management console</div>
        </div>
        <nav style={s.nav}>
          {navItems.map(item => (
            <div key={item.id} style={s.navItem(active === item.id)} onClick={() => setActive(item.id)}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
              {item.label}
              {item.id === "bookings" && pendingCount > 0 && (
                <span style={{ marginLeft: "auto", fontSize: 11, background: "#e24b4a", color: "white", borderRadius: 99, padding: "1px 7px", fontWeight: 500 }}>{pendingCount}</span>
              )}
            </div>
          ))}
        </nav>
        <div style={{ padding: "12px 16px", borderTop: "0.5px solid var(--color-border-tertiary)", fontSize: 12, color: "var(--color-text-tertiary)" }}>
          Firebase connected <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#639922", marginLeft: 4, verticalAlign: "middle" }} />
        </div>
      </aside>

      <main style={s.main}>
        <div style={s.topbar}>
          <div style={{ fontWeight: 500, fontSize: 15 }}>{pageTitle}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {maintenanceMode && <span style={{ fontSize: 12, background: "#faeeda", color: "#854f0b", padding: "4px 10px", borderRadius: 99, display: "flex", alignItems: "center", gap: 5 }}><i className="ti ti-tool" style={{ fontSize: 12 }} aria-hidden="true" /> Maintenance ON</span>}
            {alerts.length > 0 && <span style={{ fontSize: 12, background: "#faeeda", color: "#854f0b", padding: "4px 10px", borderRadius: 99 }}>{alerts.length} alerts</span>}
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Admin</div>
          </div>
        </div>
        <div style={s.content}>
          {loading && active === "dashboard" && bookings.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-secondary)", fontSize: 14 }}>Loading dashboard data...</div>
          ) : (
            sections[active]?.()
          )}
        </div>
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: toast.type === "danger" ? "#fcebeb" : "var(--color-background-primary)", border: `0.5px solid ${toast.type === "danger" ? "#f09595" : "var(--color-border-secondary)"}`, borderRadius: "var(--border-radius-md)", padding: "10px 16px", fontSize: 13, color: toast.type === "danger" ? "#a32d2d" : "var(--color-text-primary)", zIndex: 1000, display: "flex", alignItems: "center", gap: 8 }}>
          <i className={`ti ${toast.type === "danger" ? "ti-alert-circle" : "ti-check"}`} aria-hidden="true" />{toast.msg}
        </div>
      )}
    </div>
  );
}
