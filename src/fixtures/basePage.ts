
import { test as base } from "@playwright/test"
import SearchJobPage from "../pages/SearchJobPage";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import BookmarksPage from "../pages/BookmarksPage";
import SignUpPage from "../pages/SignUpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import MailinatorPage from "../pages/MailinatorPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import UserPage from "../pages/UserPage";
import ApplyDirectPage from "../pages/ApplyDirectPage";
import JobOpportunitiesPage from "../pages/JobOpportunitiesPage";
import CreateJobPage from "../pages/CreateJobPage";
import ApplicantsPage from "../pages/ApplicantsPage";
import AdvicePage from "../pages/AdvicePage";
import EmployerProfilePage from "../pages/EmployerProfilePage";
import TopEmployersPage from "../pages/TopEmployersPage";
import PostJobPage from "../pages/PostJobPage";
import AccountEmployerHubPage from "../pages/AccountEmployerHubPage";
import DashboardEmployerHubPage from "../pages/DashboardEmployerHubPage";
import CMSContentPage from "../pages/CMSContentPage";
import AddCMSContentPage from "../pages/AddCMSContentPage";

export const test = base.extend<{
	searchJobPage: SearchJobPage, homePage: HomePage, signInPage: SignInPage, bookmarksPage: BookmarksPage, signUpPage: SignUpPage, resetPasswordPage: ResetPasswordPage, mailinatorPage: MailinatorPage, changePasswordPage: ChangePasswordPage, userPage: UserPage, applyDirectPage: ApplyDirectPage, jobOpportunitiesPage: JobOpportunitiesPage,
	createJobPage: CreateJobPage, applicantsPage: ApplicantsPage, advicePage: AdvicePage, employerProfilePage: EmployerProfilePage, topEmployersPage: TopEmployersPage, postJobPage: PostJobPage, accountEmployerHubPage: AccountEmployerHubPage, dashboardEmployerHubPage: DashboardEmployerHubPage, cmsContentPage: CMSContentPage, addCMSContentPage: AddCMSContentPage
}>({
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},

	searchJobPage: async ({ page }, use) => {
		await use(new SearchJobPage(page));
	},

	signInPage: async ({ page }, use) => {
		await use(new SignInPage(page));
	},

	bookmarksPage: async ({ page }, use) => {
		await use(new BookmarksPage(page));
	},

	signUpPage: async ({ page }, use) => {
		await use(new SignUpPage(page));
	},

	resetPasswordPage: async ({ page }, use) => {
		await use(new ResetPasswordPage(page));
	},

	mailinatorPage: async ({ page }, use) => {
		await use(new MailinatorPage(page));
	},
	changePasswordPage: async ({ page }, use) => {
		await use(new ChangePasswordPage(page));
	},

	userPage: async ({ page }, use) => {
		await use(new UserPage(page));
	},
	applyDirectPage: async ({ page }, use) => {
		await use(new ApplyDirectPage(page));
	},
	jobOpportunitiesPage: async ({ page }, use) => {
		await use(new JobOpportunitiesPage(page));
	},
	createJobPage: async ({ page }, use) => {
		await use(new CreateJobPage(page));
	},
	applicantsPage: async ({ page }, use) => {
		await use(new ApplicantsPage(page));
	},
	advicePage: async ({ page }, use) => {
		await use(new AdvicePage(page));
	},
	employerProfilePage: async ({ page }, use) => {
		await use(new EmployerProfilePage(page));
	},
	topEmployersPage: async ({ page }, use) => {
		await use(new TopEmployersPage(page));
	},
	postJobPage: async ({ page }, use) => {
		await use(new PostJobPage(page));
	},
	accountEmployerHubPage: async ({ page }, use) => {
		await use(new AccountEmployerHubPage(page));
	},
	dashboardEmployerHubPage: async ({ page }, use) => {
		await use(new DashboardEmployerHubPage(page));
	},
	cmsContentPage: async ({ page }, use) => {
		await use(new CMSContentPage(page));
	},
	addCMSContentPage: async ({ page }, use) => {
		await use(new AddCMSContentPage(page));
	},

})