import HomeController from "../controllers/Home"
import AdvertisingRepository from "../repositories/advertising"
import BannerRepository from "../repositories/Banner"
import HomeRepository from "../repositories/Home"
import LinkRepository from "../repositories/Link"
import HomeService from "../services/Home"

const bannerRepository = new BannerRepository()
const linkRepository = new LinkRepository()
const homeRepository = new HomeRepository()
const advertisingRepository = new AdvertisingRepository()

const homeService = new HomeService(
  bannerRepository,
  linkRepository,
  homeRepository,
  advertisingRepository
)

const homeController = new HomeController(homeService)

export { homeController }
