import DashboardIcon from '@mui/icons-material/Dashboard';
import {
    AccountBalance,
    ApartmentSharp,
    BiotechSharp,
    CloudDownloadSharp,
    MedicationLiquid,
    Sick,
    SvgIconComponent
} from '@mui/icons-material';
import {ReactElement} from "react";
import {SvgIconTypeMap} from '@mui/material';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {DashboardPage} from "../pages/dashboard/dashboard.page";

export interface PageArgs {
    title: string;
    path: string;
    element?: ReactElement<any, any>;
    showOnPanel: boolean;
    hasParameters?: boolean;
    icon?: SvgIconComponent;
    parent?: Page;
    subItems?: Page[];
    searchable?: boolean;
}

export class Page implements PageArgs {

    title: string;
    path: string;
    element?: ReactElement<any, any>;
    showOnPanel: boolean;
    hasParameters?: boolean;
    icon?: (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string; });
    parent?: Page;
    subItems?: Page[];
    searchable?: boolean;

    constructor(args: PageArgs) {

        this.title = args.title;
        this.path = args.path;
        this.element = args.element;
        this.showOnPanel = args.showOnPanel;
        this.hasParameters = args.hasParameters;
        this.icon = args.icon;
        this.parent = args.parent;
        this.subItems = args.subItems;
        this.searchable = args.searchable ?? true;
        if (this.parent) {
            if (this.parent.subItems) {
                this.parent.subItems.push(this);
            } else this.parent.subItems = [this];
        }
    }

    public getFullRoute(): string {
        if (this.parent) {
            return this.parent.getFullRoute() + this.path;
        } else return this.path;
    }

    public getPathElements(): string[] {
        if (this.parent) {
            return [...this.parent.getPathElements(), this.title];
        } else return [this.title];
    }
}

export const getPages = (): Page[] => {
    let pages: Page[] = [];
    const dashboard = new Page({
        title: 'Dashboard',
        element: DashboardPage(),
        path: '/',
        showOnPanel: true,
        icon: DashboardIcon
    });
    const finance = new Page({title: 'Finances', path: '/finances', showOnPanel: true, icon: AccountBalance,searchable: false});
    const outgoingInvoices = new Page({
        title: 'Outgoing Invoices',
        path: '/outgoing-invoices',
        showOnPanel: true,
        parent: finance
    });
    const incomingInvoices = new Page({
        title: 'Incoming Invoices',
        path: '/incoming-invoices',
        showOnPanel: true,
        parent: finance
    });

    const medications = new Page({
        title: 'Medications',
        path: '/medications',
        showOnPanel: true,
        icon: MedicationLiquid
    });
    const patients = new Page({title: 'Patients', path: '/patients', showOnPanel: true, icon: Sick});
    const diagnostics = new Page({
        title: 'Diagnostics',
        path: '/diagnostics',
        showOnPanel: true,
        icon: Sick,
        searchable: false
    });
    const allDiagnostics = new Page({title: 'All diagnostics', path: '/all', showOnPanel: true, icon: Sick});
    const localDiagnostic = new Page({
        title: 'Local diagnostics',
        path: '/diagnostics/local-diagnostic',
        parent: diagnostics,
        showOnPanel: true,
        icon: ApartmentSharp
    });
    const remoteDiagnostic = new Page({
        title: 'Remote diagnostics',
        path: '/diagnostics/remote-diagnostic',
        parent: diagnostics,
        showOnPanel: true,
        icon: CloudDownloadSharp
    });
    const labResults = new Page({
        title: 'Lab results',
        path: '/diagnostics/lab-results',
        parent: diagnostics,
        showOnPanel: true,
        icon: BiotechSharp
    });

    pages.push(dashboard, finance, medications, patients, diagnostics);

    return pages;
}