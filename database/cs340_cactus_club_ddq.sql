-- Database Definition Queries for the Cactus Club Project Website
-- CS 340 Project: Team 17 - Nathan Klump & Lidia Alexia Banos

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `cs340_cactus_club_ddq`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cashiers`
--

CREATE TABLE `Cashiers` (
  `cashier_id` int(6) NOT NULL,
  `cashier_first` varchar(50) NOT NULL,
  `cashier_last` varchar(50) NOT NULL,
  `hourly_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Cashiers`
--

INSERT INTO `Cashiers` (`cashier_id`, `cashier_first`, `cashier_last`, `hourly_rate`) VALUES
(750235, 'Monica', 'Geller', 22.5),
(750236, 'Chandler', 'Bing', 18.5),
(750237, 'Regina', 'Philange', 20.75);

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customer_id` int(6) NOT NULL,
  `customer_last` varchar(50) NOT NULL,
  `customer_first` varchar(50) NOT NULL,
  `customer_street` varchar(50) DEFAULT NULL,
  `customer_email` varchar(50) DEFAULT NULL,
  `customer_city` varchar(50) DEFAULT NULL,
  `customer_state` varchar(2) DEFAULT NULL,
  `customer_zip` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customer_id`, `customer_last`, `customer_first`, `customer_street`, `customer_email`, `customer_city`, `customer_state`, `customer_zip`) VALUES
(159263, 'Geller', 'Ross', '27 Madison', 'rgeller@yahoo.com', 'New York', 'NY', 10019),
(159264, 'Green', 'Rachel', '23 Park Ave', 'rachelgrn@gmail.com', 'New York', 'NY', 10016),
(159265, 'Buffay', 'Phoebe', '806 Jefferson', 'phoebo@sbcglobal.net', 'New York', 'NY', 10019);

-- --------------------------------------------------------

--
-- Table structure for table `InvoiceItems`
--

CREATE TABLE `InvoiceItems` (
  `invoiceItem_id` int(6) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `plant_id` int(11) NOT NULL,
  `plant_quantity` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `InvoiceItems`
--

INSERT INTO `InvoiceItems` (`invoiceItem_id`, `invoice_id`, `plant_id`, `plant_quantity`) VALUES
(110000, 100000, 4563, 5),
(110001, 100001, 4562, 2),
(110002, 100001, 4563, 1),
(110003, 100003, 4562, 4),
(110004, 100003, 4565, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `invoice_id` int(6) NOT NULL,
  `customer_id` int(6) NOT NULL,
  `cashier_id` int(3) NOT NULL,
  `total_price` float NOT NULL,
  `invoice_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`invoice_id`, `customer_id`, `cashier_id`, `total_price`, `invoice_date`) VALUES
(100000, 159263, 750237, 62.5, '2022-01-11'),
(100001, 159264, 750236, 58.4, '2022-02-03'),
(100003, 159265, 750235, 100.55, '2022-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `Plants`
--

CREATE TABLE `Plants` (
  `plant_id` int(4) NOT NULL,
  `plant_name` varchar(50) NOT NULL,
  `plant_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Plants`
--

INSERT INTO `Plants` (`plant_id`, `plant_name`, `plant_price`) VALUES
(4562, 'Easter Cactus', 22.95),
(4563, 'Moon Cactus', 12.5),
(4565, 'Star Cactus', 8.75);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cashiers`
--
ALTER TABLE `Cashiers`
  ADD PRIMARY KEY (`cashier_id`);

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `InvoiceItems`
--
ALTER TABLE `InvoiceItems`
  ADD PRIMARY KEY (`invoiceItem_id`),
  ADD KEY `invoiceItems_invoice_id_fk` (`invoice_id`),
  ADD KEY `invoiceItems_plant_id_fk` (`plant_id`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `invoices_customer_id_fk` (`customer_id`),
  ADD KEY `invoices_cashier_id_fk` (`cashier_id`);

--
-- Indexes for table `Plants`
--
ALTER TABLE `Plants`
  ADD PRIMARY KEY (`plant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cashiers`
--
ALTER TABLE `Cashiers`
  MODIFY `cashier_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=750239;

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159266;

--
-- AUTO_INCREMENT for table `InvoiceItems`
--
ALTER TABLE `InvoiceItems`
  MODIFY `invoiceItem_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110005;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `invoice_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100004;

--
-- AUTO_INCREMENT for table `Plants`
--
ALTER TABLE `Plants`
  MODIFY `plant_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4566;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `InvoiceItems`
--
ALTER TABLE `InvoiceItems`
  ADD CONSTRAINT `invoiceItems_invoice_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `Invoices` (`invoice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoiceItems_plant_id_fk` FOREIGN KEY (`plant_id`) REFERENCES `Plants` (`plant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `invoices_cashier_id_fk` FOREIGN KEY (`cashier_id`) REFERENCES `Cashiers` (`cashier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;