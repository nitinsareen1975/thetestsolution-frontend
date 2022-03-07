import React, { useEffect, useState, useRef } from "react";
import { Spin, Row, Col, Button } from 'antd';
import PatientAPI from "../../redux/api/patient-api";
/* import moment from "moment";
import logo from "../../assets/images/logo.png";
import QRCode from "react-qr-code";
import ReactToPdf from "react-to-pdf";
import { DownloadOutlined } from '@ant-design/icons'; */
const output = (props) => {
	const reportRef = useRef();
	const [submitted, setSubmitted] = useState(false);
	const [report, setReport] = useState({});
	useEffect(async () => {
		setSubmitted(true);
		await PatientAPI.getPatientReportPDF({ patientId: props.match.params.patientId, confirmationCode: props.match.params.code }).then(resp => {
			if (resp.status && resp.status === true) {
				console.log("resp:", resp);
				setReport(resp.data);
			} else {
				if (resp.message) {
					notifyUser(resp.message, "error");
				} else {
					notifyUser("User not found.", "error");
				}
			}
			setSubmitted(false);
		}).catch(() => {
			setSubmitted(false);
		});
	}, []);

	return <Spin spinning={submitted}>
		{report.url ?
			<object data={report.url} type="application/pdf" style={{ height: '100vh', width: '100%'}}>
				<p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
			</object>
			: ""}
		{/* <ReactToPdf scale={0.8} targetRef={reportRef} filename={`patient-report.pdf`}>
				{({ toPdf }) => (
					<>
						<div className="reportwrap">
							<div style={{ float: 'right', marginBottom: 20, marginRight: 22}}><Button type="primary" icon={<DownloadOutlined />} onClick={toPdf}>Download pdf</Button></div>
							<div className="reportwrap-print" ref={reportRef}>
								<table style={{ maxWidth: '100%', width: '100%', margin: '5px 0px 5px' }}>
									<tr>
										<td>
											<Row gutter={24} >
												<Col xs={12} style={{ textAlign: 'left', }}>
													<img src={logo} alt="Logo" style={{ width: '100%', maxWidth: '150px', maxHeight: '55px' }} />
												</Col>
												<Col xs={12} style={{ textAlign: 'right', }}>
													<h3>Florida Health</h3>
													<p>
														Basedon Revisions to Rule 64D-3.029<br />
														Florida AdministrativeCode<br />
														Effective October 20, 2016<br />
													</p>
												</Col>
											</Row>
										</td>
									</tr>
								</table>
								<table style={{ maxWidth: '100%', width: '100%' }}>
									<tr>
										<td>
											<Row gutter={24} >
												<Col xs={24} style={{ textAlign: 'left', }}>
													<table style={{ maxWidth: '100%', width: '100%', borderSpacing: '5px', borderCollapse: 'separate' }}>
														<tr>
															<td style={{ border: '1px solid #000', }}>
																<table className="infoTable" style={{ maxWidth: '100%', width: '100%' }}>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Patient NAME</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.firstname} {report.lastname}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Date of birth</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {moment(report.dob).format("MMM DD, YYYY")}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Sex</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.gender}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Address</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.street}, {report.city}, {report.state}, {report.zip}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Phone number</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.phone}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Ethnicity</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.ethnicity}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Pregnancy status</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.pregnent != null ? report.pregnent : "N/A"}</td>
																	</tr>
																</table>
															</td>
															<td style={{ border: '1px solid #000', }}>
																<table className="infoTable" style={{ maxWidth: '100%', width: '100%' }}>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Specimen Collection date</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {moment(report.specimen_collection_date).format("MMM DD, YYYY")}</td>
																	</tr>

																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Date of report</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {moment(report.result_date).format("MMM DD, YYYY")}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Type of specimen</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.specimen_type}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Specimen collection site</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.specimen_site != null ? report.specimen_site : "N/A"}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Phone number</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.lab_phone}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>Licence Number</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.licence_number}</td>
																	</tr>
																	<tr>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>FDI Number</td>
																		<td style={{ padding: '2px 4px', borderBottom: '1px solid #f7f7f7' }}>: {report.loinc}</td>
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
								<div style={{ border: '1px solid #000', margin: '0px 5px 10px' }}>
									<table style={{ maxWidth: '100%', width: '100%' }}>
										<tr>
											<td style={{ padding: '2px 4px', textAlign: 'center' }}>DEPARTMENT OF MOLECULAR BIOLOGY</td>
											<td style={{ padding: '2px 4px', textAlign: 'right' }}> IN/OUT SAMPLE :Outhouse Sample</td>
										</tr>
									</table>
								</div>
								<div style={{ margin: '5px 5px 0px' }}>
									<table className="resultTable" style={{ maxWidth: '100%', width: '100%', textAlign: 'left' }}>
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
												<td>{report.test_type_name}</td>
												<td>{report.result.toUpperCase()}</td>
												<td></td>
												<td>{report.result.toLowerCase().replace(/\b[a-z]/g, function (letter) { return letter.toUpperCase() })}</td>
												<td>{report.test_type_method}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="commentBlock" style={{ border: '1px solid #000', margin: '0px 5px 5px', borderTop: 'none', padding: '5px' }}>
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
												<td>{report.result.toLowerCase().replace(/\b[a-z]/g, function (letter) { return letter.toUpperCase() })} RNA specific to {report.test_type_name} Detected</td>
												<td>{report.result_value}</td>
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
											<li>The Institut Pasteur website:<br />
												https://www.pasteur.fr/en/medical-center/disease-sheets/covid-19-disease-novel- coronavirus#symptoms. Accessed March 2020.</li>
											<li>Center for Disease Control (CDC) website: https://www.cdc.gov/urdo/downloads/SpecCollectionGuidelines.pdf. Accessed March 2020.</li>
											<li>CDC Interim Guidelines for Collecting, Handling, and Testing Clinical Specimens from Patients Under Investigation (PUIs) for 2019 Novel Coronavirus. https://www.cdc.gov/coronavirus/2019-nCoV/guidelines-clinical-specimens.html.
												Accessed May 2020.</li>
											<li>World Health Organization (WHO). Laboratory testing for coronavirus disease 2019 (COVID-19) in suspected human cases: Interim guidance, 2 March 2020.</li>
										</ul>
									</div>
								</div>
								<h4 style={{ maxWidth: '100%', width: '100%', textAlign: 'center' }}>*** End Of Report ***</h4>
							</div>
							<footer className="reportFooter">
								<Row>
									<Col>
										<div className="doctorDetails">
											DR. B.N.Datta<br />
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
												<QRCode value={window.location.href} level="Q" size="120" />
											</td>
											<td>{report.lab_name}<br />
												{report.lab_street}, {report.lab_city}, {report.lab_state}<br />
												{report.lab_zip}</td>
											<td>
												{report.lab_name}<br />
												{report.lab_street}, {report.lab_city}, {report.lab_state}<br />
												{report.lab_zip}
											</td>
										</tr>
									</tbody>
								</table>
							</footer>
						</div>
					</>
				)}
			</ReactToPdf> */}
	</Spin>;
}
export default output;