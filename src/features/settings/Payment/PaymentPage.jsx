import React, { useState } from "react";
import styles from "./Styles/PaymentPage.module.css";
import { Heading, Img, Text } from "../../../components/ui";
import Icon from "../../../components/Icon";
import masterCard from "../../../assets/paymentImages/MasterCard.png";

const methodIcons = [
  { name: "visa", src: "visa.png" },
  { name: "master-card", src: masterCard },
  { name: "amex", src: "amex.png" },
  { name: "diners", src: "diners.png" },
];

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "United States",
    state: "",
    city: "",
    zip: "",
    membershipType: "pro",
    termsAccepted: false,
    useCoins: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    alert(
      `Payment submitted for ${formData.membershipType} plan using ${formData.paymentMethod}`
    );
    console.log("Form Data:", formData);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as={"h1"} className={styles.title}>
            Take Your Membership to the Next Level
          </Heading>
          <Text as={"p"} className={styles.description}>
            Unlock full access to all features and maximize your savings with an
            additional <strong>20% discount</strong> for yearly subscriptions.
          </Text>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            {/* Left Section */}
            <div className={styles.leftSection}>
              <div className={styles.contentWrapper}>
                <Heading as={"h3"} className={styles.sectionTitle}>
                  Payment Method
                </Heading>
                <div className={styles.methodOptions}>
                  {/* Card Option */}
                  <label
                    className={`${styles.method} ${
                      formData.paymentMethod === "card" ? styles.active : ""
                    }`}
                  >
                    <input
                      type="radio" // Changed from checkbox to radio
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className={styles.radio} // Update class if needed
                    />
                    <span className={styles.customRadio}></span>
                    <div className={styles.methodIconsContainer}>
                      {methodIcons.map((icon) => (
                        <Img
                          key={icon.name}
                          src={icon.src}
                          alt={icon.name}
                          className={styles.methodsIcon}
                        />
                      ))}
                      {/* <Icon
                        sprite="payment"
                        name="master-card"
                        className={styles.methodsIcon}
                      /> */}
                    </div>
                  </label>
                  {/* UPI Option */}
                  <label className={styles.method}>
                    <input
                      type="radio" // Changed from checkbox to radio
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className={styles.radio} // Update class if needed
                    />
                    <span className={styles.customRadio}></span>
                    <span>UPI</span>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "card" && (
                <div className={styles.contentWrapper}>
                  <h3 className={styles.sectionTitle}>Card Details</h3>
                  <div className={styles.inputWrapper}>
                    {/* Card Holder Name */}
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    {/* Card Number */}
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    {/* DD/YY And Cvv */}
                    <div className={styles.row}>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM / YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        className={styles.inputSmall}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={styles.inputSmall}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.contentWrapper}>
                <h3 className={styles.sectionTitle}>Address</h3>
                <div className={styles.inputWrapper}>
                  <div className={styles.row}>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      disabled
                      className={`${styles.input} ${styles.disabled}`}
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.row}>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <textarea
                    type="text"
                    name="address"
                    placeholder="Add Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <Text as={"p"} className={styles.captionText}>Please enter valid address for secure payment.</Text>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>
              <div className={styles.membership}>
                <h3 className={styles.sectionTitle}>Membership Type</h3>
                <label className={styles.plan}>
                  <input
                    type="radio"
                    name="membershipType"
                    value="basic"
                    checked={formData.membershipType === "basic"}
                    onChange={handleChange}
                  />
                  <span>Basic</span>
                  <span className={styles.price}>$36 / Year</span>
                </label>
                <label className={styles.plan}>
                  <input
                    type="radio"
                    name="membershipType"
                    value="normal"
                    checked={formData.membershipType === "normal"}
                    onChange={handleChange}
                  />
                  <span>Normal</span>
                  <span className={styles.price}>$60 / Year</span>
                </label>
                <label className={styles.plan}>
                  <input
                    type="radio"
                    name="membershipType"
                    value="pro"
                    checked={formData.membershipType === "pro"}
                    onChange={handleChange}
                  />
                  <span>Pro</span>
                  <span className={styles.price}>$72 / Year</span>
                  <span className={styles.save}>Save 20%</span>
                </label>
                <label className={styles.plan}>
                  <input
                    type="radio"
                    name="membershipType"
                    value="advance"
                    checked={formData.membershipType === "advance"}
                    onChange={handleChange}
                  />
                  <span>Advance</span>
                  <span className={styles.price}>$96 / Year</span>
                </label>
              </div>

              <div className={styles.extras}>
                <label>
                  <input
                    type="checkbox"
                    name="useCoins"
                    checked={formData.useCoins}
                    onChange={handleChange}
                  />
                  Use Coins (1 coin = $0.05). Balance: 1000 coins.
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  By continuing, you agree to our{" "}
                  <a href="/terms">terms and conditions</a>.
                </label>
              </div>

              <button type="submit" className={styles.submitButton}>
                Upgrade Plan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
