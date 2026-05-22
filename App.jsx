import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Activity, 
  DollarSign, 
  Percent, 
  Table, 
  ListTree, 
  Target, 
  PackageMinus, 
  Layers,
  ShoppingBag,
  TrendingDown,
  Calendar,
  Briefcase,
  AlertCircle,
  Settings,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Edit3,
  Sliders,
  FileText,
  FileSpreadsheet,
  Info,
  Link as LinkIcon
} from 'lucide-react';

const DEFAULT_KPI_DATA = {
  nsv: { value: 1057.2, iop: 48.6, ly: 221.0, unit: 'Tỷ' },
  gm: { value: 33.2, iop: 0.8, ly: -1.1, unit: '%' },
  tr: { value: 10.3, iop: 2.7, ly: 9.6, unit: '%' }
};

const DEFAULT_FY_TRACKING_DATA = {
  nsv: { current: 1057.2, target: 3532.8, pct: 29.9 },
  tr: { current: 108.5, target: 232.0, pct: 46.8 }
};

const DEFAULT_BRAND_DATA = [
  { name: 'HCB', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-50', textBorder: 'border-blue-200', textBrand: 'text-blue-600', nsv: 508.5, gm: 37.2, tr: 19.2, nsvIOP: 32.9 },
  { name: 'PONNIE', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-50', textBorder: 'border-orange-200', textBrand: 'text-orange-600', nsv: 548.7, gm: 29.5, tr: 2.0, nsvIOP: 15.7 }
];

const DEFAULT_MONTHLY_DATA = [
  { month: 'Tháng 1', hcb: 90.5, ponnie: 88.0 },
  { month: 'Tháng 2', hcb: 105.5, ponnie: 104.5 },
  { month: 'Tháng 3', hcb: 163.6, ponnie: 161.2 },
  { month: 'Tháng 4', hcb: 123.4, ponnie: 151.8 }
];

const DEFAULT_PNL_BRAND_YTD = [
  { item: 'Doanh thu thuần', total: {val: 1057, pct: 100}, col1: {val: 509, pct: 100}, col2: {val: 549, pct: 100} },
  { item: 'Biên lợi nhuận gộp', total: {val: 351, pct: 33.2}, col1: {val: 189, pct: 37.2}, col2: {val: 162, pct: 29.5} },
  { item: 'MKT Branding', total: {val: -67, pct: -6.3}, col1: {val: -23, pct: -4.4}, col2: {val: -45, pct: -8.1} },
  { item: 'Khuyến mãi (Promo)', total: {val: -6, pct: -0.6}, col1: {val: -1, pct: -0.2}, col2: {val: -5, pct: -1.0} },
  { item: 'Chi phí Bán hàng', total: {val: -96, pct: -9.1}, col1: {val: -38, pct: -7.6}, col2: {val: -57, pct: -10.5} },
  { item: 'Chi phí Gián tiếp', total: {val: -42, pct: -4.0}, col1: {val: -20, pct: -4.0}, col2: {val: -22, pct: -4.0} },
  { item: 'Lợi nhuận Kinh doanh', total: {val: 108, pct: 10.3}, col1: {val: 98, pct: 19.2}, col2: {val: 11, pct: 2.0} }
];

const DEFAULT_PNL_BRAND_FY = [
  { item: 'Doanh thu thuần', total: {val: 3534, pct: 100}, col1: {val: 1646, pct: 100}, col2: {val: 1888, pct: 100} },
  { item: 'Biên lợi nhuận gộp', total: {val: 1202, pct: 34.0}, col1: {val: 591, pct: 35.9}, col2: {val: 611, pct: 32.3} },
  { item: 'MKT Branding', total: {val: -256, pct: -7.2}, col1: {val: -108, pct: -6.6}, col2: {val: -148, pct: -7.8} },
  { item: 'Khuyến mãi (Promo)', total: {val: -36, pct: -1.0}, col1: {val: -6, pct: -0.4}, col2: {val: -30, pct: -1.6} },
  { item: 'Chi phí Bán hàng', total: {val: -416, pct: -11.8}, col1: {val: -183, pct: -11.1}, col2: {val: -233, pct: -12.3} },
  { item: 'Chi phí Gián tiếp', total: {val: -83, pct: -2.3}, col1: {val: -37, pct: -2.3}, col2: {val: -46, pct: -2.4} },
  { item: 'Lợi nhuận Kinh doanh', total: {val: 317, pct: 9.0}, col1: {val: 229, pct: 13.9}, col2: {val: 88, pct: 4.7} }
];

const DEFAULT_PNL_CHANNEL_YTD = [
  { item: 'Doanh thu thuần', total: {val: 1057, pct: 100}, col1: {val: 185, pct: 100}, col2: {val: 872, pct: 100} },
  { item: 'Biên lợi nhuận gộp', total: {val: 351, pct: 33.2}, col1: {val: 72, pct: 39.0}, col2: {val: 279, pct: 32.0} },
  { item: 'MKT Branding', total: {val: -67, pct: -6.3}, col1: {val: -13, pct: -7.0}, col2: {val: -54, pct: -6.2} },
  { item: 'Khuyến mãi (Promo)', total: {val: -6, pct: -0.6}, col1: {val: -6, pct: -3.5}, col2: {val: 0, pct: 0.0} },
  { item: 'Chi phí Bán hàng', total: {val: -96, pct: -9.1}, col1: {val: -27, pct: -14.5}, col2: {val: -69, pct: -7.9} },
  { item: 'Chi phí Gián tiếp', total: {val: -42, pct: -4.0}, col1: {val: -6, pct: -3.5}, col2: {val: -36, pct: -4.1} },
  { item: 'Lợi nhuận Kinh doanh', total: {val: 108, pct: 10.3}, col1: {val: 8, pct: 4.5}, col2: {val: 100, pct: 11.5} }
];

const DEFAULT_PNL_CHANNEL_FY = [
  { item: 'Doanh thu thuần', total: {val: 3534, pct: 100}, col1: {val: 661, pct: 100}, col2: {val: 2874, pct: 100} },
  { item: 'Biên lợi nhuận gộp', total: {val: 1202, pct: 34.0}, col1: {val: 268, pct: 40.6}, col2: {val: 933, pct: 32.5} },
  { item: 'MKT Branding', total: {val: -256, pct: -7.2}, col1: {val: -49, pct: -7.5}, col2: {val: -207, pct: -7.2} },
  { item: 'Khuyến mãi (Promo)', total: {val: -36, pct: -1.0}, col1: {val: -36, pct: -5.5}, col2: {val: 0, pct: 0.0} },
  { item: 'Chi phí Bán hàng', total: {val: -416, pct: -11.8}, col1: {val: -92, pct: -14.0}, col2: {val: -324, pct: -11.3} },
  { item: 'Chi phí Gián tiếp', total: {val: -83, pct: -2.3}, col1: {val: -22, pct: -3.3}, col2: {val: -61, pct: -2.1} },
  { item: 'Lợi nhuận Kinh doanh', total: {val: 317, pct: 9.0}, col1: {val: 33, pct: 5.0}, col2: {val: 284, pct: 9.9} }
];

const DEFAULT_PNL_SUBCAT_YTD = [
  { item: 'Doanh thu thuần', total: {val: 1057, pct: 100}, col1: {val: 573, pct: 100}, col2: {val: 456, pct: 100}, col3: {val: 28, pct: 100} },
  { item: 'Biên lợi nhuận gộp', total: {val: 351, pct: 33.2}, col1: {val: 208, pct: 36.3}, col2: {val: 136, pct: 29.8}, col3: {val: 6, pct: 23.4} },
  { item: 'MKT Branding', total: {val: -67, pct: -6.3}, col1: {val: -29, pct: -5.0}, col2: {val: -37, pct: -8.0}, col3: {val: -2, pct: -6.4} },
  { item: 'Khuyến mãi (Promo)', total: {val: -6, pct: -0.6}, col1: {val: -2, pct: -0.3}, col2: {val: -5, pct: -1.0}, col3: {val: 0, pct: -1.1} },
  { item: 'Chi phí Bán hàng', total: {val: -96, pct: -9.1}, col1: {val: -48, pct: -8.4}, col2: {val: -44, pct: -9.6}, col3: {val: -4, pct: -13.8} },
  { item: 'Chi phí Gián tiếp', total: {val: -42, pct: -4.0}, col1: {val: -23, pct: -4.1}, col2: {val: -18, pct: -3.9}, col3: {val: -1, pct: -3.4} },
  { item: 'Lợi nhuận Kinh doanh', total: {val: 108, pct: 10.3}, col1: {val: 96, pct: 16.8}, col2: {val: 14, pct: 3.0}, col3: {val: -1, pct: -5.3} }
];

const DEFAULT_PNL_SUBCAT_FY = [
  { item: 'Doanh thu thuần', total: {val: 3534, pct: 100}, col1: {val: 1957, pct: 100}, col2: {val: 1475, pct: 100}, col3: {val: 102, pct: 100} },
  { item: 'Biên lợi nhuận gộp', total: {val: 1202, pct: 34.0}, col1: {val: 695, pct: 35.5}, col2: {val: 478, pct: 32.4}, col3: {val: 28, pct: 27.9} },
  { item: 'MKT Branding', total: {val: -256, pct: -7.2}, col1: {val: -131, pct: -6.7}, col2: {val: -118, pct: -8.0}, col3: {val: -7, pct: -7.0} },
  { item: 'Khuyến mãi (Promo)', total: {val: -36, pct: -1.0}, col1: {val: -14, pct: -0.7}, col2: {val: -20, pct: -1.3}, col3: {val: -3, pct: -2.5} },
  { item: 'Chi phí Bán hàng', total: {val: -416, pct: -11.8}, col1: {val: -230, pct: -11.7}, col2: {val: -172, pct: -11.7}, col3: {val: -14, pct: -13.9} },
  { item: 'Chi phí Gián tiếp', total: {val: -83, pct: -2.3}, col1: {val: -45, pct: -2.3}, col2: {val: -35, pct: -2.4}, col3: {val: -3, pct: -3.0} },
  { item: 'Lợi nhuận Kinh doanh', total: {val: 317, pct: 9.0}, col1: {val: 243, pct: 12.4}, col2: {val: 76, pct: 5.1}, col3: {val: -2, pct: -2.0} }
];

const DEFAULT_GROUP_MA_YTD = {
  hcb: [
    { name: 'HCB Xốt Lắc', nsv: 287, gm: 42, tr: 23 },
    { name: 'HCB Doubling', nsv: 113, gm: 31, tr: 10 },
    { name: 'HCB Cuốn Cuốn', nsv: 66, gm: 32, tr: 13 },
    { name: 'HCB Chảo', nsv: 31, gm: 31, tr: 14 },
    { name: 'HCB Meatball', nsv: 11, gm: 28, tr: 2 }
  ],
  ponnie: [
    { name: 'Ponnie 35g', nsv: 137, gm: 37, tr: 9 },
    { name: 'Ponnie 70g', nsv: 77, gm: 40, tr: 11 },
    { name: 'Bin&Bon 19gr ca', nsv: 57, gm: 3, tr: -22 },
    { name: 'Ponnie 19g', nsv: 50, gm: 13, tr: -11 },
    { name: 'Bin&Bon Heo 35gr', nsv: 48, gm: 28, tr: 3 },
    { name: 'Ponnie 120g', nsv: 44, gm: 35, tr: 10 }
  ]
};

const DEFAULT_GROUP_MA_FY = {
  hcb: [
    { name: 'HCB Xốt Lắc', nsv: 867, gm: 41, tr: 19 },
    { name: 'HCB Doubling', nsv: 344, gm: 29, tr: 6 },
    { name: 'HCB Cuốn Cuốn', nsv: 194, gm: 29, tr: 8 }
  ],
  ponnie: [
    { name: 'Ponnie 35g', nsv: 448, gm: 35, tr: 8 },
    { name: 'Ponnie 70g', nsv: 244, gm: 40, tr: 11 },
    { name: 'Ponnie 120g', nsv: 187, gm: 35, tr: 9 }
  ]
};

const DEFAULT_MATERIAL_DATA = {
  summary: [
    { period: 'YTD Jan-Apr', val: -1.74, rm: -3.89, pm: 2.14, color: 'text-emerald-600', bg: 'border-emerald-200' },
    { period: 'H1 Jan-Jun', val: 8.62, rm: -6.10, pm: 14.72, color: 'text-rose-600', bg: 'border-rose-200' },
    { period: 'YTG May-Dec', val: 34.33, rm: 4.06, pm: 30.27, color: 'text-rose-600', bg: 'border-rose-200' },
    { period: 'Full Year', val: 32.59, rm: 0.17, pm: 32.42, color: 'text-rose-600', bg: 'border-rose-200' }
  ],
  topSavings: [
    { name: 'Thịt gà xay đông lạnh', val: 2.87, pct: -13.2 },
    { name: 'Collagen Casing Devro Ø17', val: 1.73, pct: -15.0 },
    { name: 'Đường RS', val: 0.94, pct: -17.2 },
    { name: 'Da heo sấy khô', val: 0.79, pct: -7.8 },
    { name: 'Rong biển tấm gia vị', val: 0.52, pct: -1.8 }
  ],
  topHeadwinds: [
    { name: 'Ly XXTT CB 48ly x 3cây', val: 8.86, pct: 34.5 },
    { name: 'Clip nhôm xúc xích 2.1mm', val: 2.61, pct: 30.2 },
    { name: 'Màng PVDC đỏ HCB xốt lắc', val: 2.02, pct: 7.8 },
    { name: 'Màng OPP Ponnie heo 35gr', val: 1.63, pct: 45.1 },
    { name: 'Túi retort chân gà Ponnie', val: 1.46, pct: 25.7 }
  ]
};

const DEFAULT_GMIT_PROJECTS = [
  { project: 'Ponnie 120g cay', type: 'Raw', iop: 3960, actual: 4404, var: 444, note: '' },
  { project: 'Ca Bin&Bon', type: 'Packaging', iop: 2787, actual: null, var: -2787, note: 'Nhựa tăng -> NCC tăng giá' },
  { project: 'Giảm giá phô mai', type: 'Raw', iop: 9100, actual: 9095, var: -5, note: '' },
  { project: 'Bin&Bon', type: 'Raw (phase 1)', iop: 8763, actual: 1974, var: -6789, note: '' },
  { project: 'Bin&Bon', type: 'Rút cây', iop: null, actual: 5232, var: 5232, note: '' },
  { project: 'Bin&Bon', type: 'Bin&Bon gói 19', iop: null, actual: 3956, var: 3956, note: '' },
  { project: 'Bin&Bon', type: 'Price increase', iop: null, actual: 5709, var: 5709, note: '' },
  { project: 'Ponnie 19g', type: 'Rút cây', iop: null, actual: 5558, var: 5558, note: '' },
  { project: 'Cuốn Cuốn (Rút 1 lá rong biển)', type: 'Raw', iop: 6075, actual: null, var: -6075, note: '' },
  { project: 'Price Adjust phase 2 (không gồm bin&bon)', type: 'Price increase', iop: null, actual: 25291, var: 25291, note: '' },
  { project: 'Ecom Price adjust', type: 'Price increase', iop: null, actual: 2218, var: 2218, note: '+10% GM Ecom MCH từ Apr.26' }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('ytd'); // 'ytd' or 'fy'
  const [pnlDimension, setPnlDimension] = useState('brand'); // 'brand', 'channel', 'subcat'
  const [gmitUnit, setGmitUnit] = useState('million'); // 'million' or 'billion'
  const [configSubTab, setConfigSubTab] = useState('kpis'); // Sub tab inside Settings
  const [pnlEditSelect, setPnlEditSelect] = useState('brandYtd'); // State to choose which P&L sheet to edit
  const [sheetJsLoaded, setSheetJsLoaded] = useState(false);

  // States with Local Storage hydration
  const [kpis, setKpis] = useState(() => {
    const saved = localStorage.getItem('pm_kpis');
    return saved ? JSON.parse(saved) : DEFAULT_KPI_DATA;
  });

  const [fyTracking, setFyTracking] = useState(() => {
    const saved = localStorage.getItem('pm_fy_tracking');
    return saved ? JSON.parse(saved) : DEFAULT_FY_TRACKING_DATA;
  });

  const [brands, setBrands] = useState(() => {
    const saved = localStorage.getItem('pm_brands');
    return saved ? JSON.parse(saved) : DEFAULT_BRAND_DATA;
  });

  const [monthly, setMonthly] = useState(() => {
    const saved = localStorage.getItem('pm_monthly');
    return saved ? JSON.parse(saved) : DEFAULT_MONTHLY_DATA;
  });

  const [gmitProjs, setGmitProjs] = useState(() => {
    const saved = localStorage.getItem('pm_gmit_projects');
    return saved ? JSON.parse(saved) : DEFAULT_GMIT_PROJECTS;
  });

  const [pnlDataState, setPnlDataState] = useState(() => {
    const saved = localStorage.getItem('pm_pnl_sheets');
    if (saved) return JSON.parse(saved);
    return {
      brandYtd: DEFAULT_PNL_BRAND_YTD,
      brandFy: DEFAULT_PNL_BRAND_FY,
      channelYtd: DEFAULT_PNL_CHANNEL_YTD,
      channelFy: DEFAULT_PNL_CHANNEL_FY,
      subcatYtd: DEFAULT_PNL_SUBCAT_YTD,
      subcatFy: DEFAULT_PNL_SUBCAT_FY
    };
  });

  const [groupMAState, setGroupMAState] = useState(() => {
    const saved = localStorage.getItem('pm_group_ma');
    if (saved) return JSON.parse(saved);
    return {
      ytd: DEFAULT_GROUP_MA_YTD,
      fy: DEFAULT_GROUP_MA_FY
    };
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('pm_materials');
    return saved ? JSON.parse(saved) : DEFAULT_MATERIAL_DATA;
  });

  const [alertMsg, setAlertMsg] = useState(null);

  // --- PARSE SHARED URL LOGIC ---
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedBase64 = params.get('share');
      if (sharedBase64) {
        // Decode encoded JSON from URL
        const decodedString = decodeURIComponent(escape(atob(sharedBase64)));
        const data = JSON.parse(decodedString);
        
        if (data.kpis) setKpis(data.kpis);
        if (data.fyTracking) setFyTracking(data.fyTracking);
        if (data.brands) setBrands(data.brands);
        if (data.monthly) setMonthly(data.monthly);
        if (data.gmitProjs) setGmitProjs(data.gmitProjs);
        if (data.pnlDataState) setPnlDataState(data.pnlDataState);
        if (data.groupMAState) setGroupMAState(data.groupMAState);
        if (data.materials) setMaterials(data.materials);
        
        // Remove 'share' parameter from the address bar to clean the URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
        triggerAlert("Đã nạp thành công bộ số liệu từ liên kết chia sẻ!");
      }
    } catch (err) {
      console.error("Lỗi đồng bộ dữ liệu chia sẻ qua link:", err);
    }
  }, []);

  // Dynamically load SheetJS
  useEffect(() => {
    if (window.XLSX) {
      setSheetJsLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.async = true;
    script.onload = () => setSheetJsLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('pm_kpis', JSON.stringify(kpis));
    localStorage.setItem('pm_fy_tracking', JSON.stringify(fyTracking));
    localStorage.setItem('pm_brands', JSON.stringify(brands));
    localStorage.setItem('pm_monthly', JSON.stringify(monthly));
    localStorage.setItem('pm_gmit_projects', JSON.stringify(gmitProjs));
    localStorage.setItem('pm_pnl_sheets', JSON.stringify(pnlDataState));
    localStorage.setItem('pm_group_ma', JSON.stringify(groupMAState));
    localStorage.setItem('pm_materials', JSON.stringify(materials));
  }, [kpis, fyTracking, brands, monthly, gmitProjs, pnlDataState, groupMAState, materials]);

  const triggerAlert = (msg, type = 'success') => {
    setAlertMsg({ message: msg, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // --- SHARE FUNCTION (ENCODES CURRENT STATE TO BASE64 URL) ---
  const handleGenerateShareUrl = () => {
    try {
      const payload = {
        kpis,
        fyTracking,
        brands,
        monthly,
        gmitProjs,
        pnlDataState,
        groupMAState,
        materials
      };
      // Encode standard unicode string into base64 safely
      const serialized = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      const shareUrl = `${window.location.origin}${window.location.pathname}?share=${serialized}`;
      
      // Try copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerAlert("Đã tạo & sao chép Link chứa số liệu hiện tại vào Clipboard!");
      }).catch(() => {
        // Fallback for isolated browser frames
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        triggerAlert("Đã sao chép liên kết (Fallback)!");
      });
    } catch (err) {
      console.error(err);
      triggerAlert("Không thể tạo liên kết chia sẻ!", "error");
    }
  };

  const exportToExcelTemplate = () => {
    if (!window.XLSX) {
      triggerAlert("Thư viện Excel đang tải, vui lòng đợi 1 giây!", "error");
      return;
    }

    try {
      const wb = window.XLSX.utils.book_new();

      // Sheet 1: KPIs & Brands
      const kpiRows = [
        ["CHỬ SỐ DỰ ÁN", "GIÁ TRỊ HIỆN TẠI", "SO VỚI KẾ HOẠCH (IOP)", "SO VỚI CÙNG KỲ (LY)", "ĐƠN VỊ"],
        ["Net Sales Value (NSV)", kpis.nsv.value, kpis.nsv.iop, kpis.nsv.ly, kpis.nsv.unit],
        ["Gross Margin (GM)", kpis.gm.value, kpis.gm.iop, kpis.gm.ly, kpis.gm.unit],
        ["Trading Result (TR)", kpis.tr.value, kpis.tr.iop, kpis.tr.ly, kpis.tr.unit],
        [],
        ["TÊN THƯƠNG HIỆU HIỂN THỊ", "TÊN CHUẨN", "MÀU NỀN GIÁO DIỆN (BG CSS)"],
        ["Thương hiệu 1", brands[0]?.name || "HCB", brands[0]?.color || "bg-blue-600"],
        ["Thương hiệu 2", brands[1]?.name || "PONNIE", brands[1]?.color || "bg-orange-500"],
        [],
        ["TIẾN TRÌNH FY TARGET", "ĐẠT ĐƯỢC YTD", "MỤC TIÊU NĂM (FULL YEAR)"],
        ["Net Sales Value (NSV) Target", fyTracking.nsv.current, fyTracking.nsv.target],
        ["Trading Result (TR) Target", fyTracking.tr.current, fyTracking.tr.target]
      ];
      const wsKPIs = window.XLSX.utils.aoa_to_sheet(kpiRows);
      window.XLSX.utils.book_append_sheet(wb, wsKPIs, "KPIs_and_Brands");

      // Sheet 2: GMIT Projects Table
      const gmitHeader = [["SÁNG KIẾN DỰ ÁN", "PHÂN LOẠI (TYPE)", "KẾ HOẠCH IOP (TRIỆU VND)", "THỰC TẾ ACTUAL (TRIỆU VND)", "GHI CHÚ"]];
      const gmitRows = gmitProjs.map(p => [p.project, p.type, p.iop || 0, p.actual || 0, p.note || '']);
      const wsGMIT = window.XLSX.utils.aoa_to_sheet([...gmitHeader, ...gmitRows]);
      window.XLSX.utils.book_append_sheet(wb, wsGMIT, "GMIT_Projects");

      // Sheet 3: P&L Sheets
      const pnlRows = [
        ["BẢNG P&L CHI TIẾT (TỶ VND)", "CHỈ TIÊU P&L", "TỔNG CHUNG (TỔNG PM VAL)", "TỔNG CHUNG (%)", "CỘT NHÓM 1 VAL", "CỘT NHÓM 1 (%)", "CỘT NHÓM 2 VAL", "CỘT NHÓM 2 (%)", "BẢNG NGUỒN"]
      ];
      
      const appendPnlDataToRows = (pnlArr, sheetName) => {
        pnlArr.forEach(row => {
          pnlRows.push([
            sheetName, 
            row.item, 
            row.total.val, 
            row.total.pct, 
            row.col1.val, 
            row.col1.pct, 
            row.col2.val, 
            row.col2.pct,
            sheetName
          ]);
        });
      };
      appendPnlDataToRows(pnlDataState.brandYtd, "brandYtd");
      appendPnlDataToRows(pnlDataState.brandFy, "brandFy");
      appendPnlDataToRows(pnlDataState.channelYtd, "channelYtd");
      appendPnlDataToRows(pnlDataState.channelFy, "channelFy");
      appendPnlDataToRows(pnlDataState.subcatYtd, "subcatYtd");
      appendPnlDataToRows(pnlDataState.subcatFy, "subcatFy");

      const wsPnL = window.XLSX.utils.aoa_to_sheet(pnlRows);
      window.XLSX.utils.book_append_sheet(wb, wsPnL, "PnL_Sheets_Data");

      window.XLSX.writeFile(wb, "Processed_Meat_Dashboard_Template.xlsx");
      triggerAlert("Đã xuất file mẫu thành công!");
    } catch (err) {
      console.error(err);
      triggerAlert("Lỗi khi kết xuất file mẫu Excel!", "error");
    }
  };

  const handleExcelImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.XLSX) {
      triggerAlert("Thư viện phân tích Excel chưa sẵn sàng!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = window.XLSX.read(data, { type: 'array' });

        let kpisUpdated = { ...kpis };
        let brandsUpdated = [...brands];
        let fyTrackingUpdated = { ...fyTracking };
        let gmitProjsUpdated = [];
        let pnlDataUpdated = { ...pnlDataState };

        // 1. Parse Sheet "KPIs_and_Brands"
        if (workbook.Sheets["KPIs_and_Brands"]) {
          const arr = window.XLSX.utils.sheet_to_json(workbook.Sheets["KPIs_and_Brands"], { header: 1 });
          
          if (arr[1]) {
            kpisUpdated.nsv = { value: parseFloat(arr[1][1]) || 0, iop: parseFloat(arr[1][2]) || 0, ly: parseFloat(arr[1][3]) || 0, unit: String(arr[1][4] || 'Tỷ') };
          }
          if (arr[2]) {
            kpisUpdated.gm = { value: parseFloat(arr[2][1]) || 0, iop: parseFloat(arr[2][2]) || 0, ly: parseFloat(arr[2][3]) || 0, unit: String(arr[2][4] || '%') };
          }
          if (arr[3]) {
            kpisUpdated.tr = { value: parseFloat(arr[3][1]) || 0, iop: parseFloat(arr[3][2]) || 0, ly: parseFloat(arr[3][3]) || 0, unit: String(arr[3][4] || '%') };
          }

          if (arr[6] && brandsUpdated[0]) {
            brandsUpdated[0].name = String(arr[6][1] || 'HCB').toUpperCase();
          }
          if (arr[7] && brandsUpdated[1]) {
            brandsUpdated[1].name = String(arr[7][1] || 'PONNIE').toUpperCase();
          }

          if (arr[10]) {
            fyTrackingUpdated.nsv.current = parseFloat(arr[10][1]) || kpisUpdated.nsv.value;
            fyTrackingUpdated.nsv.target = parseFloat(arr[10][2]) || 3532.8;
            fyTrackingUpdated.nsv.pct = Math.round((fyTrackingUpdated.nsv.current / fyTrackingUpdated.nsv.target) * 1000) / 10;
          }
          if (arr[11]) {
            fyTrackingUpdated.tr.current = parseFloat(arr[11][1]) || 108.5;
            fyTrackingUpdated.tr.target = parseFloat(arr[11][2]) || 232.0;
            fyTrackingUpdated.tr.pct = Math.round((fyTrackingUpdated.tr.current / fyTrackingUpdated.tr.target) * 1000) / 10;
          }
        }

        // 2. Parse Sheet "GMIT_Projects"
        if (workbook.Sheets["GMIT_Projects"]) {
          const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets["GMIT_Projects"]);
          rows.forEach((row) => {
            const project = row["SÁNG KIẾN DỰ ÁN"] || row["Sáng kiến / Dự án GMIT"] || row["project"];
            if (project) {
              const iop = parseFloat(row["KẾ HOẠCH IOP (TRIỆU VND)"] || row["iop"]) || 0;
              const actual = parseFloat(row["THỰC TẾ ACTUAL (TRIỆU VND)"] || row["actual"]) || 0;
              gmitProjsUpdated.push({
                project: String(project),
                type: String(row["PHÂN LOẠI (TYPE)"] || row["type"] || "Raw"),
                iop: iop || null,
                actual: actual || null,
                var: (actual || 0) - (iop || 0),
                note: String(row["GHI CHÚ"] || row["note"] || "")
              });
            }
          });
        }

        // 3. Parse Sheet "PnL_Sheets_Data"
        if (workbook.Sheets["PnL_Sheets_Data"]) {
          const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets["PnL_Sheets_Data"]);
          const tempPnL = {
            brandYtd: [], brandFy: [], channelYtd: [], channelFy: [], subcatYtd: [], subcatFy: []
          };

          rows.forEach((row) => {
            const sheetKey = row["BẢNG P&L CHI TIẾT (TỶ VND)"] || row["BẢNG NGUỒN"] || row["sheet"];
            const item = row["CHỈ TIÊU P&L"] || row["Chỉ tiêu P&L"] || row["item"];
            
            if (sheetKey && item && tempPnL[sheetKey]) {
              tempPnL[sheetKey].push({
                item: String(item),
                total: {
                  val: parseFloat(row["TỔNG CHUNG (TỔNG PM VAL)"] || row["total_val"]) || 0,
                  pct: parseFloat(row["TỔNG CHUNG (%)"] || row["total_pct"]) || 0
                },
                col1: {
                  val: parseFloat(row["CỘT NHÓM 1 VAL"] || row["col1_val"]) || 0,
                  pct: parseFloat(row["CỘT NHÓM 1 (%)"] || row["col1_pct"]) || 0
                },
                col2: {
                  val: parseFloat(row["CỘT NHÓM 2 VAL"] || row["col2_val"]) || 0,
                  pct: parseFloat(row["CỘT NHÓM 2 (%)"] || row["col2_pct"]) || 0
                }
              });
            }
          });

          Object.keys(tempPnL).forEach(key => {
            if (tempPnL[key].length > 0) {
              pnlDataUpdated[key] = tempPnL[key];
            }
          });
        }

        setKpis(kpisUpdated);
        setBrands(brandsUpdated);
        setFyTracking(fyTrackingUpdated);
        if (gmitProjsUpdated.length > 0) setGmitProjs(gmitProjsUpdated);
        setPnlDataState(pnlDataUpdated);

        triggerAlert("Tải lên và đồng bộ hóa thành công dữ liệu từ file Excel!");
      } catch (err) {
        console.error(err);
        triggerAlert("Lỗi phân tích cú pháp Excel!", "error");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => {
    if (window.confirm("Khôi phục toàn bộ dữ liệu mặc định?")) {
      setKpis(DEFAULT_KPI_DATA);
      setFyTracking(DEFAULT_FY_TRACKING_DATA);
      setBrands(DEFAULT_BRAND_DATA);
      setMonthly(DEFAULT_MONTHLY_DATA);
      setGmitProjs(DEFAULT_GMIT_PROJECTS);
      setPnlDataState({
        brandYtd: DEFAULT_PNL_BRAND_YTD,
        brandFy: DEFAULT_PNL_BRAND_FY,
        channelYtd: DEFAULT_PNL_CHANNEL_YTD,
        channelFy: DEFAULT_PNL_CHANNEL_FY,
        subcatYtd: DEFAULT_PNL_SUBCAT_YTD,
        subcatFy: DEFAULT_PNL_SUBCAT_FY
      });
      setGroupMAState({
        ytd: DEFAULT_GROUP_MA_YTD,
        fy: DEFAULT_GROUP_MA_FY
      });
      setMaterials(DEFAULT_MATERIAL_DATA);
      triggerAlert("Đã khôi phục dữ liệu mặc định!");
    }
  };

  const computedGmitTotals = gmitProjs.reduce((acc, proj) => {
    acc.iop += proj.iop || 0;
    acc.actual += proj.actual || 0;
    acc.var += proj.var || 0;
    return acc;
  }, { iop: 0, actual: 0, var: 0 });

  const formatGmitVal = (val) => {
    if (val === null || val === undefined) return '-';
    if (gmitUnit === 'billion') {
      return (val / 1000).toFixed(3) + ' Tỷ';
    }
    return val.toLocaleString('vi-VN') + ' tr';
  };

  const FormatDiff = ({ value, unit = '' }) => {
    const isPositive = value > 0;
    return (
      <span className={`flex items-center text-sm font-semibold ${isPositive ? 'text-rose-600' : 'text-emerald-600'}`}>
        {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        {Math.abs(value).toFixed(1)}{unit}
      </span>
    );
  };

  const getPnlData = () => {
    if (timeframe === 'ytd') {
      if (pnlDimension === 'brand') return { headers: [brands[0]?.name || 'HCB', brands[1]?.name || 'PONNIE'], data: pnlDataState.brandYtd };
      if (pnlDimension === 'channel') return { headers: ['MT (Hiện đại)', 'GT (Truyền thống)'], data: pnlDataState.channelYtd };
      if (pnlDimension === 'subcat') return { headers: ['SNACK', 'XXTT', 'MAIN MEAL'], data: pnlDataState.subcatYtd };
    } else {
      if (pnlDimension === 'brand') return { headers: [brands[0]?.name || 'HCB', brands[1]?.name || 'PONNIE'], data: pnlDataState.brandFy };
      if (pnlDimension === 'channel') return { headers: ['MT (Hiện đại)', 'GT (Truyền thống)'], data: pnlDataState.channelFy };
      if (pnlDimension === 'subcat') return { headers: ['SNACK', 'XXTT', 'MAIN MEAL'], data: pnlDataState.subcatFy };
    }
    return { headers: [brands[0]?.name || 'HCB', brands[1]?.name || 'PONNIE'], data: pnlDataState.brandYtd };
  };

  const { headers: pnlHeaders, data: pnlData } = getPnlData();
  const currentGroupMA = timeframe === 'ytd' ? groupMAState.ytd : groupMAState.fy;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* Alert Toast */}
      {alertMsg && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 ${
          alertMsg.type === 'error' 
            ? 'bg-rose-50 border-rose-200 text-rose-800' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          <CheckCircle className="w-5 h-5 mr-3" />
          <span className="font-semibold text-sm">{alertMsg.message}</span>
        </div>
      )}

      {/* --- Header / Navigation bar --- */}
      <div className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col xl:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">PROCESSED MEAT FINANCIAL PORTAL</h1>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
                  Excel Import Ready
                </span>
                {/* GLOBAL SHARE BUTTON */}
                <button
                  onClick={handleGenerateShareUrl}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow border border-indigo-400"
                >
                  <LinkIcon className="w-3 h-3" />
                  🔗 Chia sẻ URL Số liệu
                </button>
              </div>
              <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-indigo-400" />
                YTD Review Tháng 4/2026 | HCB & PONNIE (GT + MT)
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap bg-slate-800 rounded-lg p-1 border border-slate-700 justify-center">
            {[
              { id: 'overview', label: 'Tổng quan' },
              { id: 'details', label: 'Brand Insights' },
              { id: 'pnl', label: 'P&L Đa Chiều' },
              { id: 'skus', label: 'Danh mục SKUs' },
              { id: 'material', label: 'Biến động Giá (Slide)' },
              { id: 'gmit', label: 'Dự án GMIT' },
              { id: 'config', label: '⚙️ Excel & Thiết lập' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 md:px-4 rounded-md text-xs md:text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-6">
        
        {/* --- KPI PANEL --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 p-4 opacity-5"><DollarSign className="w-24 h-24" /></div>
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Net Sales Value (YTD)</h3>
            <div className="text-4xl font-black text-slate-900 mb-4">{kpis.nsv.value} <span className="text-lg text-slate-500 font-normal">{kpis.nsv.unit}</span></div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div>
                <span className="text-xs text-slate-400">vs Kế hoạch (IOP)</span>
                <FormatDiff value={kpis.nsv.iop} unit=" Tỷ" />
              </div>
              <div>
                <span className="text-xs text-slate-400">vs Cùng kỳ (LY)</span>
                <FormatDiff value={kpis.nsv.ly} unit=" Tỷ" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Percent className="w-24 h-24" /></div>
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Gross Margin (YTD)</h3>
            <div className="text-4xl font-black text-slate-900 mb-4">{kpis.gm.value}%</div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div>
                <span className="text-xs text-slate-400">vs Kế hoạch (IOP)</span>
                <FormatDiff value={kpis.gm.iop} unit="pp" />
              </div>
              <div>
                <span className="text-xs text-slate-400">vs Cùng kỳ (LY)</span>
                <FormatDiff value={kpis.gm.ly} unit="pp" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 p-4 opacity-5"><TrendingUp className="w-24 h-24" /></div>
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Trading Result (YTD)</h3>
            <div className="text-4xl font-black text-slate-900 mb-4">{kpis.tr.value}%</div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div>
                <span className="text-xs text-slate-400">vs Kế hoạch (IOP)</span>
                <FormatDiff value={kpis.tr.iop} unit="pp" />
              </div>
              <div>
                <span className="text-xs text-slate-400">vs Cùng kỳ (LY)</span>
                <FormatDiff value={kpis.tr.ly} unit="pp" />
              </div>
            </div>
          </div>
        </div>

        {/* --- TỔNG QUAN TAB --- */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-500" />
                Tiến độ thực hiện so với Kế hoạch năm (Full Year Target)
                <span className="ml-auto text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Tiến độ thời gian: 33.3% (4/12 tháng)
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-700">Doanh thu thuần (NSV)</span>
                    <span className="text-indigo-600">{fyTracking.nsv.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-2 shadow-inner">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${fyTracking.nsv.pct}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Thực đạt YTD: {fyTracking.nsv.current} Tỷ</span>
                    <span>Kế hoạch: {fyTracking.nsv.target} Tỷ</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-700">Trading Result (Tỷ VND)</span>
                    <span className="text-emerald-600">{fyTracking.tr.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-2 shadow-inner">
                    <div className="bg-emerald-50 h-full rounded-full" style={{ width: `${fyTracking.tr.pct}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Thực đạt YTD: {fyTracking.tr.current} Tỷ</span>
                    <span>Kế hoạch: {fyTracking.tr.target} Tỷ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-indigo-500" /> Tỷ trọng Kênh phân phối (YTD)
                </h3>
                <div className="relative h-10 w-full bg-slate-100 rounded-lg overflow-hidden flex mb-6 shadow-inner">
                  <div style={{ width: '82.5%' }} className="bg-indigo-600 h-full flex items-center justify-center text-white text-xs font-black">GT: 82.5%</div>
                  <div style={{ width: '17.5%' }} className="bg-sky-400 h-full flex items-center justify-center text-white text-xs font-black">MT: 17.5%</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                    <div className="text-indigo-800 font-bold text-sm mb-2">Kênh GT (Truyền thống)</div>
                    <div className="text-2xl font-black text-slate-900">872.2 <span className="text-xs font-normal text-slate-400">Tỷ</span></div>
                    <div className="flex justify-between text-xs mt-3 border-t border-indigo-100 pt-2 text-slate-500">
                      <span>GM%: <b className="text-slate-700">32.0%</b></span>
                      <span>TR%: <b className="text-indigo-700">11.5%</b></span>
                    </div>
                  </div>
                  <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                    <div className="text-sky-800 font-bold text-sm mb-2">Kênh MT (Hiện đại)</div>
                    <div className="text-2xl font-black text-slate-900">185.0 <span className="text-xs font-normal text-slate-400">Tỷ</span></div>
                    <div className="flex justify-between text-xs mt-3 border-t border-sky-100 pt-2 text-slate-500">
                      <span>GM%: <b className="text-slate-700">39.0%</b></span>
                      <span>TR%: <b className="text-sky-700">4.5%</b></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-indigo-500" /> Phân phối Ngành hàng (Subcategory YTD)
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'SNACK (Xúc xích ăn liền)', val: 573, pct: 54.2, color: 'bg-indigo-600', gm: '36.3%', tr: '16.8%' },
                    { name: 'XXTT (Xúc xích thanh trùng)', val: 456, pct: 43.1, color: 'bg-indigo-400', gm: '29.8%', tr: '3.0%' },
                    { name: 'MAIN MEAL (Bữa chính)', val: 28, pct: 2.7, color: 'bg-slate-300', gm: '23.4%', tr: '-5.3%' }
                  ].map((subcat) => (
                    <div key={subcat.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>{subcat.name}</span>
                        <span>{subcat.val} Tỷ ({subcat.pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className={`${subcat.color} h-full`} style={{ width: `${subcat.pct}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Biên gộp: {subcat.gm}</span>
                        <span>TR: <b className={subcat.tr.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}>{subcat.tr}</b></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BRAND INSIGHTS TAB --- */}
        {activeTab === 'details' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brands.map((brand) => (
                <div key={brand.name} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className={`${brand.color} p-4 text-white flex justify-between items-center`}>
                    <h3 className="text-lg font-bold tracking-wider flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      {brand.name} PERFORMANCES
                    </h3>
                    <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded">YTD Jan-Apr</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Doanh thu Net Sales</div>
                        <div className="text-3xl font-black text-slate-900 mt-1">{brand.nsv} <span className="text-sm font-normal text-slate-400">Tỷ</span></div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block mb-1">vs Kế hoạch (IOP)</span>
                        <FormatDiff value={brand.nsvIOP} unit=" Tỷ" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                      <div className={`border-r ${brand.textBorder} pr-4`}>
                        <div className="text-xs text-slate-400 font-bold">Biên Lợi nhuận Gộp</div>
                        <div className="text-2xl font-black text-slate-800 mt-1">{brand.gm}%</div>
                      </div>
                      <div className="pl-2">
                        <div className="text-xs text-slate-400 font-bold">Trading Result (TR%)</div>
                        <div className={`text-2xl font-black ${brand.textBrand} mt-1`}>{brand.tr}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" />
                Diễn biến Doanh thu các Tháng Gần đây (Tỷ VND)
              </h3>
              <div className="h-64 mt-10 flex items-end justify-around border-b border-slate-200 relative pb-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
                  {[200, 150, 100, 50, 0].map(val => (
                     <div key={val} className="w-full border-b border-slate-100 flex items-end h-full">
                       <span className="text-[10px] text-slate-400 absolute -translate-y-full -translate-x-6">{val} Tỷ</span>
                     </div>
                  ))}
                </div>
                {monthly.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center group z-10 w-1/4">
                    <div className="flex items-end justify-center space-x-2 h-48 w-full">
                      <div className="w-10 md:w-14 bg-blue-500 rounded-t relative group-hover:opacity-90 transition-all shadow-sm" style={{ height: `${(data.hcb / 200) * 100}%` }}>
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">{data.hcb}</span>
                      </div>
                      <div className="w-10 md:w-14 bg-orange-400 rounded-t relative group-hover:opacity-90 transition-all shadow-sm" style={{ height: `${(data.ponnie / 200) * 100}%` }}>
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-700 bg-orange-50 border border-orange-100 px-1 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">{data.ponnie}</span>
                      </div>
                    </div>
                    <span className="mt-4 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center mt-6 space-x-6 text-xs">
                <div className="flex items-center"><div className="w-3.5 h-3.5 bg-blue-500 rounded mr-2"></div> {brands[0]?.name || 'HCB'}</div>
                <div className="flex items-center"><div className="w-3.5 h-3.5 bg-orange-400 rounded mr-2"></div> {brands[1]?.name || 'PONNIE'}</div>
              </div>
            </div>
          </div>
        )}

        {/* --- P&L ĐA CHIỀU TAB --- */}
        {activeTab === 'pnl' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button onClick={() => setTimeframe('ytd')} className={`px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all ${timeframe === 'ytd' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>YTD (Jan-Apr)</button>
                <button onClick={() => setTimeframe('fy')} className={`px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all ${timeframe === 'fy' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>Full Year Dự phóng</button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Xem theo chiều:</span>
                <button onClick={() => setPnlDimension('brand')} className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold border ${pnlDimension === 'brand' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>Thương hiệu</button>
                <button onClick={() => setPnlDimension('channel')} className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold border ${pnlDimension === 'channel' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>Kênh bán</button>
                <button onClick={() => setPnlDimension('subcat')} className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold border ${pnlDimension === 'subcat' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>Phân khúc</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center uppercase">
                  <Table className="w-5 h-5 mr-2 text-indigo-500" /> Báo cáo P&L (Tỷ VND) - {timeframe === 'ytd' ? 'YTD' : 'Dự phóng Năm'}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[700px]">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 w-1/4">Chỉ tiêu P&L</th>
                      <th className="px-6 py-4 text-right bg-indigo-50/30">Tổng PM</th>
                      {pnlHeaders.map((head, i) => (
                         <th key={i} className="px-6 py-4 text-right">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pnlData.map((row, idx) => (
                      <tr key={idx} className={idx === pnlData.length - 1 ? "bg-indigo-50/50 font-bold" : "hover:bg-slate-50 transition-colors"}>
                        <td className="px-6 py-4 font-semibold text-slate-800">{row.item}</td>
                        <td className="px-6 py-4 text-right bg-indigo-50/10">
                          <div className={row.total.val < 0 ? "text-rose-600" : "text-slate-900 font-bold"}>{row.total.val}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{row.total.pct}%</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={row.col1.val < 0 ? "text-rose-600" : "text-slate-900"}>{row.col1.val}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{row.col1.pct}%</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={row.col2.val < 0 ? "text-rose-600" : "text-slate-900"}>{row.col2.val}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{row.col2.pct}%</div>
                        </td>
                        {row.col3 && (
                          <td className="px-6 py-4 text-right">
                            <div className={row.col3.val < 0 ? "text-rose-600" : "text-slate-900"}>{row.col3.val}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{row.col3.pct}%</div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- DANH MỤC SKUs TAB --- */}
        {activeTab === 'skus' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-800 flex items-center">
                  <ListTree className="w-5 h-5 mr-2 text-indigo-500" /> Phân tích Hiệu quả nhóm hàng chính (Group MA)
                </h3>
              <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button onClick={() => setTimeframe('ytd')} className={`px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all ${timeframe === 'ytd' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>YTD (Jan-Apr)</button>
                <button onClick={() => setTimeframe('fy')} className={`px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all ${timeframe === 'fy' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>Dự báo Năm (FY)</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-blue-600 p-4 text-white font-bold tracking-wide flex justify-between items-center">
                  <span>DANH MỤC {brands[0]?.name || 'HCB'}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-normal">Sắp xếp theo NSV</span>
                </div>
                <div className="p-0 max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 sticky top-0 shadow-sm font-bold text-xs">
                      <tr>
                        <th className="px-4 py-3">Group MA</th>
                        <th className="px-4 py-3 text-right">NSV (Tỷ)</th>
                        <th className="px-4 py-3 text-right">GM%</th>
                        <th className="px-4 py-3 text-right">TR%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentGroupMA.hcb.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-4 py-3 font-semibold text-slate-800">{item.name}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-900">{item.nsv}</td>
                          <td className="px-4 py-3 text-right text-slate-500 font-medium">{item.gm}%</td>
                          <td className={`px-4 py-3 text-right font-bold ${item.tr < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{item.tr}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-orange-500 p-4 text-white font-bold tracking-wide flex justify-between items-center">
                  <span>DANH MỤC {brands[1]?.name || 'PONNIE'}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-normal">Sắp xếp theo NSV</span>
                </div>
                <div className="p-0 max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 sticky top-0 shadow-sm font-bold text-xs">
                      <tr>
                        <th className="px-4 py-3">Group MA</th>
                        <th className="px-4 py-3 text-right">NSV (Tỷ)</th>
                        <th className="px-4 py-3 text-right">GM%</th>
                        <th className="px-4 py-3 text-right">TR%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentGroupMA.ponnie.map((item, idx) => (
                        <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                          <td className="px-4 py-3 font-semibold text-slate-800">{item.name}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-900">{item.nsv}</td>
                          <td className="px-4 py-3 text-right text-slate-500 font-medium">{item.gm}%</td>
                          <td className={`px-4 py-3 text-right font-bold ${item.tr < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{item.tr}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BIẾN ĐỘNG GIÁ TAB --- */}
        {activeTab === 'material' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {materials.summary.map((item) => {
                const isSaving = item.val < 0;
                return (
                  <div key={item.period} className={`bg-white rounded-xl shadow-sm border-2 ${item.bg} p-5 relative overflow-hidden transition-all hover:scale-102`}>
                    <div className="text-xs font-extrabold text-slate-400 uppercase mb-2 tracking-wider">{item.period}</div>
                    <div className={`text-3xl font-black ${item.color} flex items-center`}>
                      {isSaving ? '' : '+'}{item.val} 
                      <span className="text-xs font-bold text-slate-400 ml-1">Tỷ VND</span>
                      {isSaving ? (
                        <TrendingDown className="w-6 h-6 ml-auto text-emerald-500" />
                      ) : (
                        <TrendingUp className="w-6 h-6 ml-auto text-rose-500" />
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">RM (Nguyên liệu):</span>
                        <span className={`font-bold ${item.rm > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {item.rm > 0 ? '+' : ''}{item.rm} Tỷ
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">PM (Bao bì):</span>
                        <span className={`font-bold ${item.pm > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {item.pm > 0 ? '+' : ''}{item.pm} Tỷ
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-100 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center">
                    <PackageMinus className="w-6 h-6 mr-3 text-indigo-500" />
                    Material Price Impact vs Last Year | Total PM (MUF 2026)
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Sắp xếp và cập nhật theo dữ liệu chính thức từ slide tài liệu tài chính.</p>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
                  All Brands | RM & PM | Full Year 2026
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-emerald-600 font-bold text-sm mb-6 flex items-center uppercase tracking-widest border-b border-emerald-100 pb-2">
                    <ArrowDown className="w-5 h-5 mr-2 bg-emerald-50 rounded-full p-0.5" /> 
                    Top 5 Savings (Favourable - Tiết kiệm)
                  </h4>
                  <div className="space-y-6">
                    {materials.topSavings.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-slate-700">
                            {idx + 1}. {item.name} 
                            <span className="text-emerald-500 font-medium ml-1">({item.pct}%)</span>
                          </span>
                          <span className="font-bold text-emerald-600">-{item.val} Tỷ</span>
                        </div>
                        <div className="w-full bg-slate-100 h-6 rounded overflow-hidden shadow-inner">
                          <div 
                            className="bg-emerald-500 h-full rounded transition-all duration-1000 ease-out" 
                            style={{ width: `${(item.val / 2.87) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-rose-600 font-bold text-sm mb-6 flex items-center uppercase tracking-widest border-b border-rose-100 pb-2">
                    <ArrowUp className="w-5 h-5 mr-2 bg-rose-50 rounded-full p-0.5" /> 
                    Top 5 Headwinds (Unfavourable - Bất lợi)
                  </h4>
                  <div className="space-y-6">
                    {materials.topHeadwinds.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-slate-700">
                            {idx + 1}. {item.name} 
                            <span className="text-rose-500 font-medium ml-1">(+{item.pct}%)</span>
                          </span>
                          <span className="font-bold text-rose-600">+{item.val} Tỷ</span>
                        </div>
                        <div className="w-full bg-slate-100 h-6 rounded overflow-hidden shadow-inner">
                          <div 
                            className="bg-rose-500 h-full rounded transition-all duration-1000 ease-out" 
                            style={{ width: `${(item.val / 8.86) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between text-[11px] text-slate-400 uppercase tracking-widest gap-2">
                 <span>Đơn vị tính: Tỷ VND</span>
                 <span>Lưu ý: (+) biểu thị giá cao hơn năm ngoái (Bất lợi) | (-) biểu thị giá thấp hơn (Có lợi)</span>
              </div>
            </div>
          </div>
        )}

        {/* --- DỰ ÁN GMIT TAB --- */}
        {activeTab === 'gmit' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Theo dõi Sáng kiến tối ưu & Biến động Giá (GMIT Project)</h3>
                  <p className="text-xs text-slate-400">YTD Performance | Sáng kiến Raw Materials & Packaging</p>
                </div>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button 
                  onClick={() => setGmitUnit('million')} 
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${gmitUnit === 'million' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
                >
                  Triệu VND (tr)
                </button>
                <button 
                  onClick={() => setGmitUnit('billion')} 
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${gmitUnit === 'billion' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
                >
                  Tỷ VND
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Tổng Kế hoạch (IOP)</span>
                <div className="text-3xl font-black text-slate-800">{formatGmitVal(computedGmitTotals.iop)}</div>
                <div className="text-xs text-indigo-500 mt-2">Ngân sách mục tiêu thiết lập</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Tổng Thực tế (Actual)</span>
                <div className="text-3xl font-black text-slate-800">{formatGmitVal(computedGmitTotals.actual)}</div>
                <div className="text-xs text-indigo-500 mt-2">Dòng tiền/Giá trị đã thực thi</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden border-r-4 border-r-rose-500">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Biến động (VAR)</span>
                <div className="text-3xl font-black text-rose-600 font-bold">
                  {computedGmitTotals.var >= 0 ? '+' : ''}{formatGmitVal(computedGmitTotals.var)}
                </div>
                <div className="text-xs text-rose-500 mt-2 font-semibold">Tác động dòng vốn tài chính</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Table className="w-5 h-5 text-indigo-500" />
                  Danh sách hạng mục chi tiết
                </h4>
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                  <AlertCircle className="w-4 h-4" />
                  <span>Dấu ngoặc đơn () thể hiện biến động Favourable (tiết kiệm)</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[800px]">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Sáng kiến / Dự án GMIT</th>
                      <th className="px-6 py-4">Phân loại (Type)</th>
                      <th className="px-6 py-4 text-right">Kế hoạch (IOP)</th>
                      <th className="px-6 py-4 text-right">Thực tế (Actual)</th>
                      <th className="px-6 py-4 text-right">Biến động (VAR)</th>
                      <th className="px-6 py-4">Ghi chú (Note)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {gmitProjs.map((row, idx) => {
                      const isFavourable = row.var < 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-800">{row.project}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              row.type.includes('Raw') ? 'bg-blue-50 text-blue-700' :
                              row.type.includes('Packaging') ? 'bg-orange-50 text-orange-700' :
                              'bg-purple-50 text-purple-700'
                            }`}>
                              {row.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-slate-600">
                            {formatGmitVal(row.iop)}
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-slate-600">
                            {formatGmitVal(row.actual)}
                          </td>
                          <td className={`px-6 py-4 text-right font-bold ${isFavourable ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isFavourable ? '(' + formatGmitVal(Math.abs(row.var)) + ')' : '+' + formatGmitVal(row.var)}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-slate-500 max-w-[200px] truncate" title={row.note}>
                            {row.note || <span className="text-slate-300 italic">None</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-extrabold text-slate-900">
                    <tr>
                      <td className="px-6 py-4">TỔNG GMIT PROJECTS</td>
                      <td className="px-6 py-4">-</td>
                      <td className="px-6 py-4 text-right">{formatGmitVal(computedGmitTotals.iop)}</td>
                      <td className="px-6 py-4 text-right">{formatGmitVal(computedGmitTotals.actual)}</td>
                      <td className={`px-6 py-4 text-right ${computedGmitTotals.var < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {computedGmitTotals.var < 0 ? '' : '+'}{formatGmitVal(computedGmitTotals.var)}
                      </td>
                      <td className="px-6 py-4 italic text-slate-400 text-xs">Biến động Tổng hợp</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Xếp hạng Mức độ Tác động đến Dòng tiền Dự án (VAR Impact Breakdown)
              </h4>
              <div className="space-y-4">
                {gmitProjs
                  .filter(p => Math.abs(p.var) > 500)
                  .sort((a, b) => b.var - a.var)
                  .map((p, idx) => {
                    const isFavorable = p.var < 0;
                    const pctOfMax = Math.abs(p.var) / 25291 * 100;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>{p.project} <span className="text-slate-400 font-medium">({p.type})</span></span>
                          <span className={isFavorable ? 'text-emerald-600' : 'text-rose-600'}>
                            {isFavorable ? 'Tiết kiệm: ' : 'Vượt định mức: '} {formatGmitVal(Math.abs(p.var))}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isFavorable ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            style={{ width: `${Math.max(pctOfMax, 2)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* --- ⚙️ TAB THIẾT LẬP & NHẬP LIỆU --- */}
        {activeTab === 'config' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {!sheetJsLoaded && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-800">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                <span className="text-xs font-semibold">Đang nạp thư viện xử lý tài liệu Excel...</span>
              </div>
            )}

            <div className="bg-gradient-to-r from-teal-600 to-indigo-800 text-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/10">
                <FileSpreadsheet className="w-96 h-96" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-white/10 rounded-lg">
                    <FileSpreadsheet className="w-8 h-8 text-emerald-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">Cập Nhật Dữ Liệu Tự Động Từ File Excel</h3>
                </div>
                <p className="text-slate-100 text-sm md:text-base mb-6 leading-relaxed">
                  Tải file mẫu Excel cấu trúc chuẩn của ứng dụng, điền hàng loạt số liệu một lần, sau đó kéo thả file trở lại đây để đồng bộ ngay lập tức!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={exportToExcelTemplate}
                    disabled={!sheetJsLoaded}
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 transition-all text-xs md:text-sm font-bold px-5 py-3 rounded-xl text-slate-900 shadow-md"
                  >
                    <Download className="w-5 h-5" />
                    Tải File Mẫu Excel (.xlsx)
                  </button>

                  <label className={`flex items-center justify-center gap-2 bg-white text-slate-800 hover:bg-slate-100 transition-all text-xs md:text-sm font-extrabold px-5 py-3 rounded-xl cursor-pointer shadow-md border border-slate-200 ${!sheetJsLoaded ? 'pointer-events-none opacity-50' : ''}`}>
                    <Upload className="w-5 h-5 text-indigo-600" />
                    Nạp Dữ Liệu Excel Mới
                    <input 
                      type="file" 
                      accept=".xlsx, .xls" 
                      onChange={handleExcelImport} 
                      className="hidden" 
                      disabled={!sheetJsLoaded}
                    />
                  </label>
                </div>

                <div className="bg-slate-900/30 rounded-xl p-4 border border-white/10">
                  <h5 className="font-bold text-xs md:text-sm flex items-center gap-2 text-indigo-200 mb-2.5">
                    <Info className="w-4 h-4" /> Hướng dẫn đồng bộ chính xác:
                  </h5>
                  <ul className="list-disc pl-5 text-[11px] md:text-xs text-slate-200 space-y-1.5">
                    <li><b>Bước 1:</b> Click "Tải File Mẫu Excel" để lấy file cấu trúc dữ liệu chuẩn.</li>
                    <li><b>Bước 2:</b> Nhập/dán dữ liệu mới vào đúng vị trí các sheet trong file mẫu.</li>
                    <li><b>Bước 3:</b> Chọn "Nạp Dữ Liệu Excel Mới" để ứng dụng cập nhật biểu đồ và tự động mã hóa lên URL.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 h-fit">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">Hạng mục chỉnh thủ công</span>
                {[
                  { id: 'kpis', label: '1. Chỉ số chính & Brands', icon: Sliders },
                  { id: 'gmit', label: '2. Dự án GMIT (Bảng)', icon: Briefcase },
                  { id: 'pnl', label: '3. Chỉ tiêu P&L', icon: Table },
                  { id: 'materials', label: '4. Biến động Giá RM/PM', icon: PackageMinus }
                ].map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setConfigSubTab(st.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2.5 transition-all ${configSubTab === st.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <Icon className="w-4 h-4" />
                      {st.label}
                    </button>
                  );
                })}
                <hr className="my-2 border-slate-100" />
                <button 
                  onClick={handleReset} 
                  className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2.5"
                >
                  <RotateCcw className="w-4 h-4" /> Reset mặc định
                </button>
              </div>

              <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                {configSubTab === 'kpis' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">Cấu hình Chỉ số KPIs chính & Tên thương hiệu</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Sửa số liệu KPI ở cột bên trái, hoặc đổi tên thương hiệu hiển thị cho toàn bộ Dashboard.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-6">
                      <div className="space-y-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Thương hiệu hiển thị (Brands)</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Thương hiệu 1</label>
                            <input 
                              type="text" 
                              value={brands[0]?.name || ''} 
                              onChange={(e) => {
                                const updated = [...brands];
                                updated[0].name = e.target.value.toUpperCase();
                                setBrands(updated);
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm font-bold bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Thương hiệu 2</label>
                            <input 
                              type="text" 
                              value={brands[1]?.name || ''} 
                              onChange={(e) => {
                                const updated = [...brands];
                                updated[1].name = e.target.value.toUpperCase();
                                setBrands(updated);
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm font-bold bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Tiến trình Kế hoạch Năm (FY Target)</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">NSV Mục tiêu FY (Tỷ)</label>
                            <input 
                              type="number" 
                              value={fyTracking.nsv.target} 
                              onChange={(e) => setFyTracking({
                                ...fyTracking, 
                                nsv: {
                                  ...fyTracking.nsv, 
                                  target: parseFloat(e.target.value) || 0,
                                  pct: Math.round(((fyTracking.nsv.current) / (parseFloat(e.target.value) || 1)) * 1000) / 10
                                }
                              })}
                              className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">TR Mục tiêu FY (Tỷ)</label>
                            <input 
                              type="number" 
                              value={fyTracking.tr.target} 
                              onChange={(e) => setFyTracking({
                                ...fyTracking, 
                                tr: {
                                  ...fyTracking.tr, 
                                  target: parseFloat(e.target.value) || 0,
                                  pct: Math.round(((fyTracking.tr.current) / (parseFloat(e.target.value) || 1)) * 1000) / 10
                                }
                              })}
                              className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none font-semibold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Chi tiết 3 thẻ KPI lớn ở đầu trang</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-xl bg-slate-50/50 space-y-3">
                          <span className="text-xs font-bold text-slate-600">Doanh thu thuần (NSV)</span>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Giá trị hiện tại (Tỷ)</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={kpis.nsv.value} 
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setKpis({...kpis, nsv: {...kpis.nsv, value: val}});
                                setFyTracking({...fyTracking, nsv: {...fyTracking.nsv, current: val, pct: Math.round((val / fyTracking.nsv.target) * 1000) / 10}});
                              }}
                              className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">vs IOP (Tỷ)</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={kpis.nsv.iop} 
                                onChange={(e) => setKpis({...kpis, nsv: {...kpis.nsv, iop: parseFloat(e.target.value) || 0}})}
                                className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">vs LY (Tỷ)</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={kpis.nsv.ly} 
                                onChange={(e) => setKpis({...kpis, nsv: {...kpis.nsv, ly: parseFloat(e.target.value) || 0}})}
                                className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-xl bg-slate-50/50 space-y-3">
                          <span className="text-xs font-bold text-slate-600">Biên gộp (Gross Margin %)</span>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Giá trị hiện tại (%)</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={kpis.gm.value} 
                              onChange={(e) => setKpis({...kpis, gm: {...kpis.gm, value: parseFloat(e.target.value) || 0}})}
                              className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">vs IOP (pp)</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={kpis.gm.iop} 
                                onChange={(e) => setKpis({...kpis, gm: {...kpis.gm, iop: parseFloat(e.target.value) || 0}})}
                                className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">vs LY (pp)</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={kpis.gm.ly} 
                                onChange={(e) => setKpis({...kpis, gm: {...kpis.gm, ly: parseFloat(e.target.value) || 0}})}
                                className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-xl bg-slate-50/50 space-y-3">
                          <span className="text-xs font-bold text-slate-600">Trading Result (%)</span>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Giá trị hiện tại (%)</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={kpis.tr.value} 
                              onChange={(e) => setKpis({...kpis, tr: {...kpis.tr, value: parseFloat(e.target.value) || 0}})}
                              className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">vs IOP (pp)</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={kpis.tr.iop} 
                                onChange={(e) => setKpis({...kpis, tr: {...kpis.tr, iop: parseFloat(e.target.value) || 0}})}
                                className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">vs LY (pp)</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={kpis.tr.ly} 
                                onChange={(e) => setKpis({...kpis, tr: {...kpis.tr, ly: parseFloat(e.target.value) || 0}})}
                                className="w-full px-2.5 py-1.5 border rounded text-xs outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {configSubTab === 'gmit' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">Cập nhật Dự án & Sáng kiến tối ưu (GMIT)</h4>
                        <p className="text-slate-400 text-xs mt-0.5">Hàng tổng ở tab "Dự án GMIT" sẽ được hệ thống tính tự động dựa trên danh sách này.</p>
                      </div>
                      <button
                        onClick={() => {
                          setGmitProjs([...gmitProjs, { project: 'Dự án mới', type: 'Raw', iop: 0, actual: 0, var: 0, note: '' }]);
                          triggerAlert("Đã tạo thêm dòng dự án mới ở cuối bảng.");
                        }}
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg"
                      >
                        <Plus className="w-4 h-4" /> Thêm Dự án mới
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 border-b">
                          <tr>
                            <th className="px-4 py-3 w-1/4">Tên Sáng Kiến / Dự án</th>
                            <th className="px-4 py-3 w-[15%]">Loại (Type)</th>
                            <th className="px-4 py-3 w-[15%] text-right">IOP (tr)</th>
                            <th className="px-4 py-3 w-[15%] text-right">Actual (tr)</th>
                            <th className="px-4 py-3 w-[15%] text-right">Biến động (VAR)</th>
                            <th className="px-4 py-3 w-[15%]">Hành động</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {gmitProjs.map((proj, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-4 py-2">
                                <input 
                                  type="text" 
                                  value={proj.project} 
                                  onChange={(e) => {
                                    const updated = [...gmitProjs];
                                    updated[idx].project = e.target.value;
                                    setGmitProjs(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded bg-transparent focus:bg-white text-slate-800 font-semibold"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <select 
                                  value={proj.type}
                                  onChange={(e) => {
                                    const updated = [...gmitProjs];
                                    updated[idx].type = e.target.value;
                                    setGmitProjs(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded bg-white text-xs outline-none"
                                >
                                  <option value="Raw">Raw</option>
                                  <option value="Packaging">Packaging</option>
                                  <option value="Raw (phase 1)">Raw (Phase 1)</option>
                                  <option value="Rút cây">Rút cây</option>
                                  <option value="Price increase">Price increase</option>
                                </select>
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={proj.iop || ''} 
                                  onChange={(e) => {
                                    const updated = [...gmitProjs];
                                    const parsedVal = parseFloat(e.target.value) || null;
                                    updated[idx].iop = parsedVal;
                                    updated[idx].var = (updated[idx].actual || 0) - (parsedVal || 0);
                                    setGmitProjs(updated);
                                  }}
                                  placeholder="0"
                                  className="w-full px-2 py-1 border rounded text-right bg-transparent focus:bg-white font-medium"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={proj.actual || ''} 
                                  onChange={(e) => {
                                    const updated = [...gmitProjs];
                                    const parsedVal = parseFloat(e.target.value) || null;
                                    updated[idx].actual = parsedVal;
                                    updated[idx].var = (parsedVal || 0) - (updated[idx].iop || 0);
                                    setGmitProjs(updated);
                                  }}
                                  placeholder="0"
                                  className="w-full px-2 py-1 border rounded text-right bg-transparent focus:bg-white font-medium"
                                />
                              </td>
                              <td className="px-4 py-2 text-right">
                                <span className={`font-bold ${proj.var < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {proj.var >= 0 ? '+' : ''}{proj.var.toLocaleString('vi-VN')} tr
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <button
                                  onClick={() => {
                                    const updated = gmitProjs.filter((_, i) => i !== idx);
                                    setGmitProjs(updated);
                                    triggerAlert("Đã xóa dòng dự án thành công!");
                                  }}
                                  className="text-rose-500 hover:text-rose-700 p-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {configSubTab === 'pnl' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">Thiết lập dữ liệu các chỉ tiêu Bảng P&L</h4>
                        <p className="text-slate-400 text-xs mt-0.5">Chọn bảng P&L bạn muốn tùy biến cấu hình số liệu hiển thị.</p>
                      </div>
                      <select 
                        value={pnlEditSelect}
                        onChange={(e) => setPnlEditSelect(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-xs md:text-sm bg-slate-50 font-semibold focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                      >
                        <option value="brandYtd">Chiều Thương hiệu (YTD)</option>
                        <option value="brandFy">Chiều Thương hiệu (Full Year)</option>
                        <option value="channelYtd">Chiều Kênh bán (YTD)</option>
                        <option value="channelFy">Chiều Kênh bán (Full Year)</option>
                        <option value="subcatYtd">Chiều Phân khúc (YTD)</option>
                        <option value="subcatFy">Chiều Phân khúc (Full Year)</option>
                      </select>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-600 border-b">
                          <tr>
                            <th className="px-4 py-3 w-1/3">Chỉ tiêu chính</th>
                            <th className="px-4 py-3 text-right">Tổng (Giá trị)</th>
                            <th className="px-4 py-3 text-right">Tổng (%)</th>
                            <th className="px-4 py-3 text-right">Nhóm 1 (Giá trị)</th>
                            <th className="px-4 py-3 text-right">Nhóm 2 (Giá trị)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {pnlDataState[pnlEditSelect]?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-semibold text-slate-700">{row.item}</td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={row.total.val} 
                                  onChange={(e) => {
                                    const updated = { ...pnlDataState };
                                    updated[pnlEditSelect][idx].total.val = parseFloat(e.target.value) || 0;
                                    setPnlDataState(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-right font-medium"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  step="0.1"
                                  value={row.total.pct} 
                                  onChange={(e) => {
                                    const updated = { ...pnlDataState };
                                    updated[pnlEditSelect][idx].total.pct = parseFloat(e.target.value) || 0;
                                    setPnlDataState(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-right font-medium text-slate-400"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={row.col1.val} 
                                  onChange={(e) => {
                                    const updated = { ...pnlDataState };
                                    updated[pnlEditSelect][idx].col1.val = parseFloat(e.target.value) || 0;
                                    setPnlDataState(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-right font-medium"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={row.col2.val} 
                                  onChange={(e) => {
                                    const updated = { ...pnlDataState };
                                    updated[pnlEditSelect][idx].col2.val = parseFloat(e.target.value) || 0;
                                    setPnlDataState(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-right font-medium"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {configSubTab === 'materials' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">Cấu hình Biến động Giá RM (Nguyên liệu) & PM (Bao bì)</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Tùy chỉnh tác động giá nguyên vật liệu so với cùng kỳ năm trước.</p>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Bốn mốc liên kết thời gian chính (Tỷ VND)</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {materials.summary.map((item, idx) => (
                          <div key={item.period} className="p-4 border rounded-xl bg-slate-50/50 space-y-3">
                            <span className="text-xs font-extrabold text-slate-600">{item.period}</span>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-0.5">Tổng tác động</label>
                                <input 
                                  type="number" 
                                  step="0.01"
                                  value={item.val} 
                                  onChange={(e) => {
                                    const updated = { ...materials };
                                    updated.summary[idx].val = parseFloat(e.target.value) || 0;
                                    setMaterials(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-xs text-right font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-0.5">RM (Nguyên liệu)</label>
                                <input 
                                  type="number" 
                                  step="0.01"
                                  value={item.rm} 
                                  onChange={(e) => {
                                    const updated = { ...materials };
                                    updated.summary[idx].rm = parseFloat(e.target.value) || 0;
                                    setMaterials(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-xs text-right"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-0.5">PM (Bao bì)</label>
                                <input 
                                  type="number" 
                                  step="0.01"
                                  value={item.pm} 
                                  onChange={(e) => {
                                    const updated = { ...materials };
                                    updated.summary[idx].pm = parseFloat(e.target.value) || 0;
                                    setMaterials(updated);
                                  }}
                                  className="w-full px-2 py-1 border rounded text-xs text-right"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;