import React from 'react';
import moment from 'moment';
interface PropsPrintTemplate {
    pRef: any,
    username: string,
    children: React.ReactNode
}
const PrintTemplate: React.FC<PropsPrintTemplate> = (props) => {
    const { pRef, username, children } = props;
    return (
        <React.Fragment>
            <div ref={pRef}>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <div className="page-header">

                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {children}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot style={{ border: 0 }}>
                        <tr style={{ border: 0 }}>
                            <td style={{ border: 0 }}>
                                <div className="page-footer-space"></div>
                                <div className="page-footer">
                                    <div className="w-50 inline-bolck text-left">
                                        {/* <span className="pagePrint"></span> */}
                                    </div>
                                    <div className="w-50 inline-bolck text-right">
                                        {username}, {moment(new Date()).format("DD/MM/YYYY HH:mm:ss")}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </React.Fragment>
    )
}
export default PrintTemplate;