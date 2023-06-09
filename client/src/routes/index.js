import Home from '~/pages/Home';
import LichChieu from '~/pages/LichChieu';
import {
    LichChieuLayout,
    DSPhimLayout,
    DatVeLayout,
    CinemaCornerLayout,
    DatDoAnLayout,
    LoginLayout,
    ListSeatLayout,
    ThanhToanLayout,
    AdminLayout,
    RegisterLayout,
    PlayingLayout,
    BlogLayout,
    PromotionLayout,
    CinemaLayout,
    ProfileLayout,
    SupportLayout,
    SearchLayout,
} from '~/components/Layout';
import DSPhim from '~/pages/DSPhim';
import DatVe from '~/pages/DatVe';
import DienAnh from '~/pages/DienAnh';
import DienVien from '~/pages/DienVien';
import DaoDien from '~/pages/DaoDien';
import BinhLuanPhim from '~/pages/BinhLuanPhim';
import MovieBlog from '~/pages/MovieBlog';
import DatDoAn from '~/pages/DatDoAn';
import Login from '~/pages/Login';
import ListSeat from '~/pages/ListSeat';
import ThanhToan from '~/pages/ThanhToan';
import Admin from '~/pages/Admin';
import Register from '~/pages/Register';
import Playing from '~/pages/Playing';
import Blog from '~/pages/Blog';
import Promotion from '~/pages/Promotion';
import Cinema from '~/pages/Cinema';
import Profile from '~/pages/Profile';
import Support from '~/pages/Support';
import Search from '~/pages/Search';

const publicRouter = [
    { path: '/', component: Home },
    { path: '/DSPhim', component: DSPhim, layout: DSPhimLayout },
    { path: '/lichchieu', component: LichChieu, layout: LichChieuLayout },
    { path: '/DatVe', component: DatVe, layout: DatVeLayout },
    { path: '/DienAnh', component: DienAnh, layout: CinemaCornerLayout },
    { path: '/DienVien', component: DienVien, layout: CinemaCornerLayout },
    { path: '/DaoDien', component: DaoDien, layout: CinemaCornerLayout },
    { path: '/BinhLuanPhim', component: BinhLuanPhim, layout: CinemaCornerLayout },
    { path: '/MovieBlog', component: MovieBlog, layout: CinemaCornerLayout },
    { path: '/DatDoAn', component: DatDoAn, layout: DatDoAnLayout },
    { path: '/Login', component: Login, layout: LoginLayout },
    { path: '/Register', component: Register, layout: RegisterLayout },
    { path: '/ListSeat', component: ListSeat, layout: ListSeatLayout },
    { path: '/ThanhToan', component: ThanhToan, layout: ThanhToanLayout },
    { path: '/Admin', component: Admin, layout: AdminLayout },
    { path: '/PhimDangChieu', component: Playing, layout: PlayingLayout },
    { path: '/Blog', component: Blog, layout: BlogLayout },
    { path: '/PromotionDetail', component: Promotion, layout: PromotionLayout },
    { path: '/Cinema', component: Cinema, layout: CinemaLayout },
    { path: '/Profile', component: Profile, layout: ProfileLayout },
    { path: '/Support', component: Support, layout: SupportLayout },
    { path: '/Search', component: Search, layout: SearchLayout },
];
const pritaveRouter = [];

export { publicRouter, pritaveRouter };
