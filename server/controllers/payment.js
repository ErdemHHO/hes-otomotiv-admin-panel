// import PaymentModel from '../models/payment.js';

// const getAllPayments = async (req, res) => {
//     try {
//         const payments = await PaymentModel.find();
//         if (!payments || payments.length === 0) {
//         return res.status(400).json({ success: false, message: "Ödeme bulunamadı" });
//         }
//         return res.status(200).json({ success: true, payments });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// const getPayment = async (req, res) => {
//     try {
//         const payment = await PaymentModel.findById(req.params.id);
//         if (!payment) {
//         return res.status(400).json({ success: false, message: "Ödeme bulunamadı" });
//         }
//         return res.status(200).json({ success: true, payment });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// const addPayment = async (req, res) => {
//     try {
//         const payment = await PaymentModel.create(req.body);
//         return res.status(201).json({ success: true, payment, message: "Ödeme başarıyla kaydedildi"});
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// const updatePayment = async (req, res) => {
//         try {
//             const payment = await PaymentModel.findById(req.params.id);
//             if (!payment) {
//             return res.status(400).json({ success: false, message: "Ödeme bulunamadı" });
//             }
//             const updatedPayment= await PaymentModel.findByIdAndUpdate(paymet._id, req.body, { new: true });

//             return res.status(200).json({ success: true, message: "Ödeme başarıyla güncellendi", updatedPayment });
//         }
//         catch (error) {
//             return res.status(400).json({ success: false, message: error.message });
//         }
//     }


// const deletePayment = async (req, res) => {
//     try {
//         const payment = await PaymentModel.findById(req.params.id);
//         if (!payment) {
//         return res.status(400).json({ success: false, message: "Ödeme bulunamadı" });
//         }
//         await PaymentModel.findByIdAndDelete(req.params.id);
//         return res.status(200).json({ success: true, message: "Ödeme başarıyla silindi" });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// export { getAllPayments, getPayment, addPayment, updatePayment, deletePayment };

