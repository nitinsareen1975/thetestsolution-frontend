import React from "react";
import { PageHeader, Descriptions, Row, Col, Title } from 'antd';
import logo from "../../assets/images/logo.png";
import VisitBarcode from "../../assets/images/barcodecode.png";
import QrBarcode from "../../assets/images/qrcode.png";
{ document.title = "Florida Health Covid Report" } 
const output = (props) => {
    
    return <div className="reportwrap">             
        <table style={{ maxWidth: '100%', width: '100%', margin: '5px 0px 5px' }}>
                <tr>
                    <td>
                        <Row gutter={24} >
                            <Col xs={12} style={{textAlign: 'left',}}>
                                <img src={logo} alt="Logo" style={{width: '100%', maxWidth: '150px', maxHeight: '55px'}} />       
                            </Col>
                            <Col xs={12} style={{textAlign: 'right',}}>
                                <h3>Florida Health</h3>
                                <p>
                                Basedon Revisions to Rule 64D-3.029<br/>
                                Florida AdministrativeCode<br/>
                                Effective October 20, 2016<br/>
                                </p>
                            </Col>
                        </Row>
                    </td>
                </tr>
        </table>      
        {/* <div  style={{display:'flex', justifyContent:' flex-end'}}>
            <table>
                <tr>
                    <td>Visit ID:</td>
                    <td>
                        <div className="barcode">
                        <img src={VisitBarcode} alt="barcode" style={{width: '100%', maxWidth: '300px'}} /> 
                        </div>               
                    </td>
                </tr>            
            </table>
        </div> */}
        <table style={{ maxWidth: '100%', width: '100%' }}>
            <tr>
                <td>
                <Row gutter={24} >
                    <Col xs={24} style={{textAlign: 'left',}}>
                    <table style={{ maxWidth: '100%', width: '100%', borderSpacing: '5px', borderCollapse: 'separate'}}>
                        <tr>
                        <td style={{border: '1px solid #000',}}>
                            <table className="infoTable" style={{ maxWidth: '100%', width: '100%' }}>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Patient NAME</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: Mr.TEJAS SHARMA</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Date of birth</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: 05/09/1992</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Sex</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: Male</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Address</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: including street, city, state, and ZIP code</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Phone number</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: +91 8054002663</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Ethnicity</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: (Hispanic or non-Hispanic</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Pregnancy status</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: if applicable</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Social security number</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: 2663</td>
                                </tr>
                            </table>
                        </td>
                    <td style={{border: '1px solid #000',}}>
                            <table className="infoTable" style={{ maxWidth: '100%', width: '100%' }}>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Specimen Collection date</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: 17/Apr/2021</td>
                                </tr>
                                
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Date of report</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: 17/Apr/2021 08:36PM</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Type of specimen</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: blood</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Specimen collection site</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: (e.g., cervix, eye) if applicable</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Phone number</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: +91 8054002663</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Licence Number</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: 0123123</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>FDI Number</td>
                                    <td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: 0123123</td>
                                </tr>
                            </table>
                        </td>
                        </tr>
                        </table>
                    </Col>
                </Row>
                </td>
            </tr>
        </table>
        <div style={{ border: '1px solid #000', margin: '0px 5px 10px'}}>
            <table style={{ maxWidth: '100%', width: '100%'}}>
                <tr>
                    <td style={{ padding: '2px 4px', textAlign: 'center'}}>DEPARTMENT OF MOLECULAR BIOLOGY</td>
                    <td style={{ padding: '2px 4px', textAlign: 'right'}}> IN/OUT SAMPLE :Outhouse Sample</td>
                </tr>
            </table>
        </div>
        <div style={{margin: '5px 5px 0px'}}>
            <table className="resultTable" style={{ maxWidth: '100%', width: '100%', textAlign: 'left'}}>
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Result</th>
                        <th span={5}>Unit</th>
                        <th>Bio. Ref. Range</th>
                        <th>Method</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>*Kit used</td>
                        <td>Meril COVID-19 Onestep RT-PCR kit</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>SARS-CoV-2 RT PCR</td>
                        <td>NEGATIVE</td>
                        <td></td>
                        <td>Negative</td>
                        <td>RT-PCR</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="commentBlock" style={{ border: '1px solid #000', margin: '0px 5px 5px', borderTop: 'none', padding: '5px'}}>
            <p><strong>Comment:</strong></p>
            <p><strong>Florida Health Registration No.: ATHCC</strong></p>
            <p><strong>Sample type: Nasopharyngeal & Oropharyngeal Swab</strong></p> 
            <table className="commentResult">
                <thead>
                    <tr>
                        <th>Result</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Positive RNA specific to SARS-CoV-2 Detected</td>
                        <td>Negative RNA specific to SARS-CoV-2 Not Detected</td>
                    </tr>
                </tbody>
            </table>
            <div className="content">
                <p>Note: The Ct value is inversely proportional to the amount of genetic material (RNA) in the starting sample and can differ with the type of kit, sample collection, transport conditions etc.</p>
                <p><strong>Methodology</strong></p>
                <p>Real Time Reverse Transcription Polymerase Chain Reaction (RT PCR) test for the detection of RNA form SARS CoV2 in human nasopharyngeal and oropharyngeal swab specimens.</p>
                <p><strong>Clinical significance</strong></p>
                <p>SARS CoV 2 is the causative agent for corona virus disease 2019 or COVID-19 in Humans. SARS CoV 2 is a Beta Corona Virus, one of the four genera of Corona Viruses. Coronaviruses are enveloped non-segmented positive sense RNA
                viruses belonging to the family coronaviridae and the order Nidovirales and broadly distributed in humans and other mammals. The common signs of COVID-19 infection include respiratory symptoms, fever, cough, shortness of breath
                and breathing difficulties. In more severe cases, infection can cause pneumonia, severe acute respiratory syndrome, kidney failure and even death. Early and correct identification of infection with SARS CoV 2 is important for effective
                isolation, treatment and case management of COVID-19.</p>
                <p><strong>Target Selection</strong></p>
                <p>The target sequence is N and ORF 1ab gene of SARS CoV2 when using Meril Covid19 kit and E gene, N gene and RdRp gene when using Hi PCR coronavirus multiplex Probe PCR kit.</p>
                <p><strong>Limitations</strong></p>
                <ol>
                    <li>
                    This kit is a qualitative kit that does not provide a quantitative value for the detected pathogens in the specimen.
                    </li>
                    <li>Positive results indicate infection but the possibility of infection with other similar viruses cannot be ruled out.</li>
                    <li>Negative result does not rule out COVID-19 infection. It should be interpretated along with the history, clinical findings and other epidemiological factors.</li>
                    <li>A not detected result means that SARS-CoV_2 RNA was not present in the specimen above the limit of detection. However, improper sample collection, handling, storage and transportation may result in false negative result. The report represents only the specimen received in the laboratory.</li>
                    <li>Negative results do not rule out possibly of SARS-CoV-2 infection and should not be used as the sole basis for patient management decisions. Presence of inhibitors, mutations and insufficient organism RNA can influence the result.</li>
                    <li>Positive result does not distinguish between viable and non-viable virus.</li>
                    <li>Viral load may differ at the beginning and towards the end of infection in an individual, thus repeat testing done on different days may show different results.</li>
                    <li>Various ICMR approved kits may have differences in test sensitivity, specificity and cut off values for PCR cycles, thus may result in difference of results.</li>
                </ol> 
                <p>Note: Test is performed using ICMR approved kit.</p>
                <p><strong>References:</strong></p>
                <ul className="list-unstyled">
                    <li>The Institut Pasteur website:<br/>
                    https://www.pasteur.fr/en/medical-center/disease-sheets/covid-19-disease-novel- coronavirus#symptoms. Accessed March 2020.</li>
                    <li>Center for Disease Control (CDC) website: https://www.cdc.gov/urdo/downloads/SpecCollectionGuidelines.pdf. Accessed March 2020.</li>
                    <li>CDC Interim Guidelines for Collecting, Handling, and Testing Clinical Specimens from Patients Under Investigation (PUIs) for 2019 Novel Coronavirus. https://www.cdc.gov/coronavirus/2019-nCoV/guidelines-clinical-specimens.html.
                    Accessed May 2020.</li>
                    <li>World Health Organization (WHO). Laboratory testing for coronavirus disease 2019 (COVID-19) in suspected human cases: Interim guidance, 2 March 2020.</li>
                </ul>
            </div>
        </div>
        <h4 style={{ maxWidth: '100%', width: '100%', textAlign: 'center'}}>*** End Of Report ***</h4>
        <footer className="reportFooter">
            <Row>
                <Col>
                    <div className="doctorDetails">
                        DR. B.N.Datta<br/>
                        Consultant Pathologist
                    </div>
                </Col>
            </Row>
            <table>
                <thead>
                    <tr>
                        <th>Report Authentication QR Code</th>
                        <th>Sample Collected At</th>
                        <th>Sample Processed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <img src={QrBarcode} alt="barcode" style={{width: '100%', maxWidth: '80px'}} /> 
                        </td>
                        <td>BABA LIFE CURE DIAG CNTR,CHD<br/>
                        Shop No 777,Thakur Dwara Rd, Manimajra<br/>
                        Chandigarh</td>
                        <td>
                            Florida HEALTHCARE<br/>
                            asedon Revisions to Rule 64D-3.029<br/>
                            Florida AdministrativeCode<br/>
                            Effective October 20, 2016<br/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer>
    </div>;
}
export default output;