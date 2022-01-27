export default{
    userRoles: {
        Administrator:{
            url:"/admin",
    
        },
        User:{
            url:"/user",
    
        },
        Partner:{
            url:"/reseller",
        }
    },
    types: {
        'Companion': {
            url: "/user"
        },
        'CSR': {
            url: "/admin"
        },
        'Membership': {
            url: "/user"
        },
        'Employee': {
            url: "/user"
        },
        'Division Manager': {
            url: "/user"
        },
        'Travel Manager': {
            url: "/user"
        },
        'Traveler': {
            url: "/user"
        },
        'Super Admin': {
            url: "/admin"
        },
        'Administrator': {
            url: "/admin"
        },
        'Admin': {
            url: "/user"
        },
        'Partner': {
            url: "/reseller"
        },
        'Hybrid Admin':{
            url:"/hybrid"
        }
    },
    permissions: {
		price_read: ['CSR','Administrator'],
		price_update: ['Administrator'],
        dashboard_charts: ['Administrator'],
        add_organization: ['Administrator'],
        update_receive_travel_alerts: ['Membership'],
        traveler_dashboard: ['Membership','Employee','Partner'],
        travel_manager_dashboard: ['Travel Manager', 'Division Manager', 'Admin'],
        organization_managers: ['Administrator', 'CSR'],
        license_count: ['Administrator', 'CSR', 'Admin','Travel Manager', 'Division Manager']
	}
}