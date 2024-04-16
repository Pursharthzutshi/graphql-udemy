<>
                <Header />
                <MenuHeader />
                {
                    this.state.alert &&
                    <>
                        <Alert message="Item added to wishlist successfully" type="success" showIcon closable onClose={this.onClose} />
                        <br />
                    </>
                }
                <div className="StepsContainer">
                    <div className="Steps">
                        <Steps size="small" current={this.state.current} labelPlacement='vertical'>
                            <Step title="Shopping Cart" />
                            <Step title="Delivery Address" />
                            <Step title="Payments" />
                        </Steps>
                    </div>
                </div>
                <br /><br />
                <div>
                    {this.state.current == 0 &&
                        <Row>
                            <Col lg={15} md={14}>
                                <Table className="MarginLeft25 Medium" pagination={false} columns={this.columns} dataSource={this.props.cart} />
                                <br />
                            </Col>
                            <Col lg={9} md={10}>
                                <div className="MarginLeft25 MarginRight25 OrderSummary Medium">
                                    <div>
                                        <Input addonAfter={<RightOutlined />} placeholder="Add Voucher Code" />
                                    </div>
                                    <br />
                                    <div className="JustifySpaceBetween"><span >ORDER SUMMARY <span className="Grey">({this.props.cart.length} ITEMS)</span></span><span><AccountBookOutlined style={{ fontSize: '18px' }} /></span>
                                    </div>
                                    <Divider />
                                    <div className="JustifySpaceBetween"><span >Cart Subtotal </span><span>{currency} {Math.round(this.state.price)}</span>
                                    </div>
                                    <div className="JustifySpaceBetween"><span >Discount on Price </span><span className="Orange">{currency} {this.props.additional_charges.discount}</span>
                                    </div>
                                    <div className="JustifySpaceBetween"><span >Coupon Discount</span><span className="Orange">{currency} {this.props.additional_charges.coupon}</span>
                                    </div>
                                    <div className="JustifySpaceBetween"><span >Shipping </span><span>{currency} {this.props.additional_charges.shipping}</span>
                                    </div>
                                    <Divider />
                                    <div className="JustifySpaceBetween"><span className="Bold">ORDER TOTAL</span><span className="Bold">{currency} {Math.round(this.state.total)}</span>
                                    </div>
                                    <br />
                                    <Button className="CheckoutButton" size="large" onClick={() => this.changeStep(1)}>PROCEED TO CHECKOUT</Button>
                                    <br /><br />
                                    <Link to="/"> <div className="ContinueShopping"><ArrowLeftOutlined />&nbsp;&nbsp;CONTINUE SHOPPING</div></Link>
                                </div>
                            </Col>
                        </Row>
                    }
                    {
                        this.state.current === 1 &&
                        <Row>
                            <Col lg={16} md={14}>
                                <div className="MarginLeft25 Address Medium">
                                    <div className="JustifySpaceBetween">
                                        <span className="Bold MarginLeft25">Delivery Address</span>

                                        <span className="Grey MarginRight25">Change Address</span>
                                    </div>
                                    <br />
                                    <div className="MarginLeft25 MarginRight25">
                                        <Row gutter={16}>
                                            {
                                                this.props.address.map((address, index) =>
                                                    <Col lg={12} xs={24} onClick={() => this.onSelectAddress(index)}>
                                                        <div className={index === this.state.active ? "ActiveAddress IndividualAddress" : "IndividualAddress"}> {address.name} <br />
                                                            {address.address}<br />
                                                            Mobile:  {address.mobile}<br />
                                                        </div>
                                                    </Col>
                                                )
                                            }
                                        </Row>
                                    </div>
                                    <br />
                                    <div className="JustifySpaceBetween">
                                        <Link to="/"> <span className="ContinueShopping MarginLeft25"><ArrowLeftOutlined />&nbsp;&nbsp;CONTINUE SHOPPING</span></Link>
                                        <span className="MarginRight25"><Button onClick={() => this.changeStep(2)} size="large" className="ProceedToPayment">PROCEED TO PAYMENT</Button></span>
                                    </div>
                                </div>
                                <br />
                            </Col>
                            <Col lg={8} md={10}>
                                <div className="MarginLeft25 MarginRight25 OrderSummary Medium">
                                    <div className="JustifySpaceBetween"><span >ORDER SUMMARY <span className="Grey">({this.props.cart.length} items)</span></span><span><AccountBookOutlined style={{ fontSize: '18px' }} /></span>
                                    </div>
                                    <Divider />
                                    {
                                        this.props.cart.map(data =>
                                            <div className="Flex Orders">
                                                <img src={data.image} width={60} />
                                                <div className="MarginLeft25">
                                                    <div className="Bold">{data.name} ok</div>
                                                    <div className="Grey">will be recieved on {data.received}</div>
                                                </div>
                                            </div>
                                        )

                                    }
                                </div>
                            </Col>
                        </Row>
                    }
                    {
                        this.state.current === 2 &&
                        <Row>
                            <Col lg={16} md={14}>
                                <div className="MarginLeft25 PaymentsParent Medium">
                                    <div className="Payments">
                                        <span className="Bold">Payment Method</span>
                                        <Divider />
                                        <Tabs defaultActiveKey="1" tabPosition="left" className="Tabs">
                                            <TabPane tab="DEBIT CARD" key="1">
                                                <span className="Bold">When You click on 'Pay Now' you will be redirected to payment gateway to complete the transaction</span><br /><br />
                                                <div className="PaymentGatewaysParent">
                                                    <Row gutter={16}>
                                                        <Col lg={6} md={12} sm={12} xs={24}>
                                                            <div className="PaymentGateways"><img className="GatewayImage" src={maestro} alt="maestro" /></div>
                                                        </Col>
                                                        <Col lg={6} md={12} sm={12} xs={24}>
                                                            <div className="PaymentGateways"><img className="GatewayImage" src={master} alt="master" /></div>
                                                        </Col>
                                                        <Col lg={6} md={12} sm={12} xs={24}>
                                                            <div className="PaymentGateways"><img className="GatewayImage" src={visa} alt="visa" /></div>
                                                        </Col>
                                                        <Col lg={6} md={12} sm={12} xs={24}>
                                                            <div className="PaymentGateways"><img className="GatewayImage" src={rupay} alt="rupay" /></div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <br />
                                                <Payment />
                                                {/* <Link to="/success"> <Button size="large" className="PayNow">PAY NOW</Button></Link> */}
                                            </TabPane>
                                            <TabPane tab="CASH ON DELIVERY" key="2">
                                                <span className="Bold">When You click on 'Pay Now' you will be redirected to payment gateway to complete the transaction</span><br /><br />
                                                <div className="CaptchaParent">
                                                    <span className="Captcha">{this.state.captcha}</span>
                                                    <span><SyncOutlined /></span>
                                                    <span className="CaptchaInput">
                                                        <Input placeholder="Enter Number ..." value={this.state.captcha_input} onChange={this.onCaptchaInputChange} /></span>
                                                </div>
                                                <br />
                                                <Payment />
                                            </TabPane>
                                            <TabPane tab="CREDIT CARD" key="3">
                                                CREDIT CARD
                                            </TabPane>
                                            <TabPane tab="EMI" key="4">
                                                EMI
                                            </TabPane>
                                            <TabPane tab="UPI" key="5">
                                                UPI
                                            </TabPane>
                                            <TabPane tab="WALLETS" key="6">
                                                WALLETS
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                                <br />
                            </Col>
                            <Col lg={8} md={10}>
                                <div className="MarginLeft25 MarginRight25 OrderSummary Medium">
                                    <span>SHIP TO</span>
                                    <Divider />
                                    <span>{this.props.address[this.state.active].name}</span><br />
                                    <span>{this.props.address[this.state.active].address}</span><br />
                                    <span>{this.props.address[this.state.active].mobile}</span><br /><br />
                                    <div>
                                        <div className="JustifySpaceBetween"><span>ORDER SUMMARY <span className="Grey">({this.props.cart.length} ITEMS)</span></span><span><AccountBookOutlined style={{ fontSize: '18px' }} /></span>
                                        </div>
                                        <Divider />
                                        {
                                            this.props.cart.map(data =>
                                                <div className="Flex Orders">
                                                    <img src={data.image} width={60} />
                                                    <div className="MarginLeft25">
                                                        <div className="Bold">{data.name}</div>
                                                        <div className="Grey">Qty: {data.quantity}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <Divider />
                                    <div className="JustifySpaceBetween"><span >ORDER SUMMARY <span className="Grey">({this.props.cart.length} ITEMS)</span></span><span><AccountBookOutlined style={{ fontSize: '18px' }} /></span>
                                    </div>
                                    <Divider />
                                    <div className="JustifySpaceBetween"><span >Cart Subtotal </span><span>{currency} {Math.round(this.state.price)}</span>
                                    </div>
                                    <div className="JustifySpaceBetween"><span >Discount on Price </span><span className="Orange">{currency} {this.props.additional_charges.discount}</span>
                                    </div>
                                    <div className="JustifySpaceBetween"><span >Coupon Discount</span><span className="Orange">{currency} {this.props.additional_charges.coupon}</span>
                                    </div>
                                    <div className="JustifySpaceBetween"><span >Shipping </span><span>{currency} {this.props.additional_charges.shipping}</span>
                                    </div>
                                    <Divider />
                                    <div className="JustifySpaceBetween"><span className="Bold">ORDER TOTAL</span><span className="Bold">{currency} {Math.round(this.state.total)}</span>
                                    </div>
                                    <br />
                                </div>
                            </Col>
                        </Row>
                    }
                    <br /><br />
                </div>
                <Footer />
            </>