import type { Template } from "./type";

export const constDefault = {
    ENTITY_ERROR_STATUS: 422,
    AUTHENTICATION_ERROR_STATUS: 401,
    FORBIDDEN_ERROR_STATUS: 403,
    NOT_FOUND_ERROR_STATUS: 404,
    INTERNAL_SERVER_ERROR_STATUS: 500
};


export const DRIVE_ID = '4E84C61D0BA8445B'


export const mockAPiTemplate: Template[] = [
    {
        id: "4E84C61D0BA8445B!s7a9e82c85b81449289655eab0c8ee643",
        title: "2- first-component.docx",
        price: 15000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBq8VrO9aDPBSCXqozAjbttA?e=gkhvsl",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=7a9e82c8-5b81-4492-8965-5eab0c8ee643&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.Kc0svwPcGNehs1b5qSZLs_ZF_WQYauHu20OyDUm-tXrRjDThdx7gvX6bPdFvqGBmkmc7GkrrFZZtnIdx-OkIwyiLiyHw6dUucMs-JnzhSD_PF18ADLQCdDrxOdDtPsXY6Pzk9E3siNtPgOigPykQFEVib-xbq42l1fmF15Z9V9hRq5c2oVCuRtCsH1xZ9_Ssah9DeSXL-J35DBZvuw3SQA5jNKp5aJvhOS2jIAM8WzkZL2Bl1JMvB4eY2wAxBpXegP7YaMjrvp1sjHkS9on8GTTJeyPGBkLOJycx-Beu5KwYLD3QH7CaM445b-CQX6SNuvMBHHc8y22kWII8GCn81RvLhsxmwuRG6TzBDoNA_aE1dkqOyNvu0wlDIG_i70PRTdOKtS10AXpCzyHyjxb0d2CPwRZDctBBNpwIWKljIZFMAssNfq1_6kStRXEd3FFV.J-m1yit4qXkMPscafY06N0DtC_IzDmHXBfbCOUXyW7k&ApiVersion=2.0",
        grade: { gradeLevelId: 1, name: "Lớp 1" },
        createdBy: { userId: "user123", username: "teacherA" }
    },
    {
        id: "4E84C61D0BA8445B!s685e4714cd6b4d8787d15c9b6f5e5256",
        title: "3-Explore the View and Text Components.docx",
        price: 15000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBq8VrO9aDPBSCXqozAjbttA?e=gkhvsl",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=685e4714-cd6b-4d87-87d1-5c9b6f5e5256&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.rTOMCtBTXHsfQzumeGmBUSXwGR7DoM6UBYbckvOwBAZxYv7ccEjlr_xqiN99Od6lgpq7_zqgJmVSPMhlhyvIRy14Flvh9KhxpoeXKT0g-53GiSz_2bWemQUoa4ABBRB-YwaHrzC2n9IUpnBxK9Fqe1beMSqGj0nGd1CruWPtn1sjyBcYIJIjNxINPCBZfum8Bh8m2sjkrj85AwZxcHJn019WGIWckbWzomYg4annK40qzwKsKa0e1H3VaymLrFODdGgZ1MIp59VKkz2rvDtDtjrTLB09MJLDGTa0Bc3NhMBT_ovfFb8_rg1HZoCUyNmG6ulzWf2sM8m_vg3ZkIScgK1K8HxYvvXa1ilsCjhMxBtEbk71GHaLi1j41MZUPAmqo-2Xsf3JEhpSxDiUgkh_Kxbs_7QSNm1t3Ar3Q9kWJNJ5sWHGx0F1Q4sKLzowCSw-.ng1SL3vGQVZd52eTT2hATbnoXYdCEZ4IFh_nhAOzDXY&ApiVersion=2.0",
        grade: { gradeLevelId: 2, name: "Lớp 2" },
        createdBy: { userId: "user124", username: "teacherB" }
    },
    {
        id: "4E84C61D0BA8445B!s6e48146565564587a4f1acd496cd867b",
        title: "4-Exercise- Build a React Native screen.docx",
        price: 20000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBq8VrO9aDPBSCXqozAjbttA?e=gkhvsl",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=6e481465-6556-4587-a4f1-acd496cd867b&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.R038VAo8HxCFZTG9iNW8CX_Lek3hupEw7KOyUlkk0ZxW9rP5FTZ0O7nC0IY1eb-0im_850atJi4e10_nP-8spbLyEzIW9MkwAbkyXJB86w5n86-2SjRfBnPfynuCuN2KfSind2Z6eEZjMvuiYJr3JVl9Pfncci3vqTFQ2Ikt3SX8qIpJ5S7xM0oclGiQl-8m4ijnZMnvPbEIVm5A-d25lIbSXezALaXnHONC3lgcrDJRutSSMyghPCddvQO0QFKr0hIY_F-RjghEO5loLI7T7uUCgKk7tk9UoIF0CMC5lVkEoH3a7fjuOCLSL_u7NVVL7jYA6VINtGOLr_p2t87g4yXXvscM34y9KKHYKjUOGZ5kvXOmFIkzYMFAvt_-K04uFjSp8vdiK9VMvC8MR0vN-O2O5fiPKuTN_9ay-btvb3FGFRtNWePJ7TZEXx-1C3Rq.b3LQkKibGfU4VI52CRyyYYE7E2lo7XnxRPA7uOH1P5w&ApiVersion=2.0",
        grade: { gradeLevelId: 3, name: "Lớp 3" },
        createdBy: { userId: "user125", username: "teacherC" }
    },
    {
        id: "4E84C61D0BA8445B!s3c1a230423724d4bbbcdc116b2c9b31a",
        title: "8-Render a large list using FlatList.docx",
        price: 20000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBq8VrO9aDPBSCXqozAjbttA?e=gkhvsl",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=3c1a2304-2372-4d4b-bbcd-c116b2c9b31a&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.kmKpfTv3XrwlUQIXbw6ELfxNpiWFtkc70vDysWnZuE620yEEVNIh_h-QQGMLbrQuAdLvnNVEHFtGADjyyr_EsMxXiEai9qdIc2ix6L8kYDEMGQ4vxKNPywNHBmmEOpdV-yvRyHQ2SSR6WejIreqZA4mgmYsk_XUWXagEqE9CJU1izXbLfnke7a80ylKc56Dc8EiBmLz2vdR3pkXIRPrEbehvgS_1taHPkoRrq6UyKfSRPOb7kr492NWBiwT5E5OZ4YnBQRkFjcLRzB4psk4_msIkAs7s7IzBfb5SoRXBn39Q67JQp37PbUg33xIDartvk4hRUx7ypEJV7S3H2XRKw8v_shQYFjmeor_wPoDG4GiGmGw31uOZARmOxhuGCpO2LY947h0rJkfcy0R9eOUTSCJahzs3L0uWr_EphfvYkd-JMX701DJWK-r28gwgqBH5.s76OY-EuJfv3kC5aT9DmAjoZz1n-WWEWAQsE3kqEZqk&ApiVersion=2.0",
        grade: { gradeLevelId: 4, name: "Lớp 4" },
        createdBy: { userId: "user126", username: "teacherD" }
    },
    {
        id: "4E84C61D0BA8445B!s26dd09c02cd94f4ba70c99454feca168",
        title: "9--Render a large list using SectionList.docx",
        price: 25000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBq8VrO9aDPBSCXqozAjbttA?e=gkhvsl",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=26dd09c0-2cd9-4f4b-a70c-99454feca168&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.ZmJTmlNdF05kcOjeCV3qdsNupozMUeTatDYWE91wsi2H1CQru0fviionOr8sQZykej3OslLsQQ4p7zO4R9_swnzk598xSHRv5Jo-qtpoPN4jOT7iJ1VY-GdV-muawD8reA56LoSSWhdSngSzrOVGwZC1P0jRN5mok7WVx0N5W6yw_Ek6Sk_be8E0J5WfvobQu95P9nX_Zl_CS1Rv29M5CJOSOG7Mvti6_sbqVuVIXDJ4TeABSB8kDWEQMSHXPFQzXou9hnpSqc5-hcGJnYIcUlDaYhDaooc6vgRY-mj7v9NTYGal-jBbS4MrXzuowE2hEt5GQlS6Ug65U3gPLy8aA79IqXMmngpFeCQhdZH9tNhAiMkaENOJoouJFpi43j-Tes_-idycL76lWJtfXdMcVwnK4EIcgsCTKCyvJCh-ENZUBl9-D3Pi9AjWS0c_YbPD.k7NM9YVvIAzmBCiYZ-bv6g8oPYeVvwaFwREIvPK2v_E&ApiVersion=2.0",
        grade: { gradeLevelId: 5, name: "Lớp 5" },
        createdBy: { userId: "user127", username: "teacherE" }
    },
    {
        id: "4E84C61D0BA8445B!s6cfc344c01b445a1be1ff5d44ecd4c0a",
        title: "Exercise 17_React Form.docx",
        price: 30000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBq8VrO9aDPBSCXqozAjbttA?e=gkhvsl",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=6cfc344c-01b4-45a1-be1f-f5d44ecd4c0a&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.tOqXvU3UAVued3CwHTydznz_io6Btdc3L5t-n4w4tpGpj2vzwNBu3p3Tb5-DLRUbAZDZp83iwlxE9sQmwPb_grnReDm-ABF2AB8nP_Ywe6M7IHrf8pdOJNY1lhqB5XudC_cRyAVEa8J3tnEXZkoWLv4IH4TBaFnfuUC2PVdjqEEGeFQhBs5qXgKpadzo5gtMXA1g6nV822_Tm-pnPRm0OxHzqqXeBW1UQS-zt9mLeHEtDTnf4rQFususFg2ph4WlB1jgQr-75DaGHr9L0yBzIUGN1f3RAVkBOJh4utYJCS_SnajDjlB1OYLc73KI8B_rX9RcWMcR00XTcx0lp0DhvxgX6tdIWdbl_eVUv7xCYUB9SPxp5dKuLb5sf4irQYMrHEAMD1khIuzgn3BPnL7n7a9aCwlqz5cKkPa793c-shMWCENCPy3O6qCwhJMbZ8eu.7asWfHs8f-6dSt1V7anIQJN_1WAq6JEfKd_wDgYoEaM&ApiVersion=2.0",
        grade: { gradeLevelId: 6, name: "Lớp 6" },
        createdBy: { userId: "user128", username: "teacherF" }
    }
]