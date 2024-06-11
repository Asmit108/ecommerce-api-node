const express=require('express')
const router=express.Router()
const adminOrderController=require('../controller/adminOrder.controller')
const authenticate=require('../middleware/authenticate')


router.get(`/`,authenticate,adminOrderController.getAllOrders)
router.put(`/:orderId/confirm`,authenticate,adminOrderController.confirmOrders)
router.put(`/:orderId/ship`,authenticate,adminOrderController.shipOrders)
router.put(`/:orderId/deliver`,authenticate,adminOrderController.deliverOrders)
router.put(`/:orderId/cancel`,authenticate,adminOrderController.cancelOrders)
router.put(`/:orderId/delete`,authenticate,adminOrderController.deleteOrders)

module.exports=router