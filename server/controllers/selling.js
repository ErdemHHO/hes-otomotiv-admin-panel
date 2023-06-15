// import SellingModel from '../models/selling.js';

// const getAllSellings = async (req, res) => {
//     try {
//         const sellings = await SellingModel.find();
//         if (!sellings || sellings.length === 0) {
//         return res.status(400).json({ success: false, message: "Satış bulunamadı" });
//         }
//         return res.status(200).json({ success: true, sellings });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     };

// const getSelling = async (req, res) => {
//     try {
//         const selling = await SellingModel.findById(req.params.id);
//         if (!selling) {
//         return res.status(400).json({ success: false, message: "Satış bulunamadı" });
//         }
//         return res.status(200).json({ success: true, selling });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// const addSelling = async (req, res) => {
//     try {
//         const selling = await SellingModel.create(req.body);
//         return res.status(201).json({ success: true, selling, message: "Satış başarıyla kaydedildi"});
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// const updateSelling = async (req, res) => {
//     try {
//         const selling = await SellingModel.findById(req.params.id);
//         if (!selling) {
//         return res.status(400).json({ success: false, message: "Satış bulunamadı" });
//         }
//         const updatedSelling = await SellingModel.findByIdAndUpdate(selling._id, req.body, { new: true });

//         return res.status(200).json({ success: true, message: "Satış başarıyla güncellendi", updatedSelling });

//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

// const deleteSelling = async (req, res) => {
//     try {
//         const selling = await SellingModel.findById(req.params.id);
//         if (!selling) {
//         return res.status(400).json({ success: false, message: "Satış bulunamadı" });
//         }
//         await SellingModel.findByIdAndDelete(req.params.id);
//         return res.status(200).json({ success: true, message: "Satış başarıyla silindi" });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
//     }

//     const searchSelling = async (req, res) => {
//         try {
//             const { q } = req.query;
//             const sellings = await SellingModel.find({
//                 $or: [{ customerName: { $regex: q, $options: "i" } }, { phoneNumber: { $regex: q, $options: "i" } }],
//             });
//             if (!sellings || sellings.length === 0) {
//                 return res.status(400).json({ success: false, message: "Satış bulunamadı" });
//             }
//             return res.status(200).json({ success: true, sellings });
//         } catch (error) {
//             return res.status(400).json({ success: false, message: error.message });
//         }
//     };

      

// export { getAllSellings, getSelling, addSelling, updateSelling, deleteSelling, searchSelling };

