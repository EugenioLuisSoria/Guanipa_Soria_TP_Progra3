const db = require("../models/index.js");
const puppeteer = require("puppeteer");

const ticketController = {
    getticket: async (req, res) => {
        try {
            const id = req.params.id;
            const venta = await db.Ventas.findByPk(id, {
                include: [
                    {
                        model: db.Producto,
                        attributes: { exclude: ["cantidad"] }, // TRAE TODOS LOS CAMPOS
                        through: {
                            attributes: { exclude: [] }, // TRAE TODOS LOS CAMPOS DEL PIVOT
                        },
                    },
                ],
                attributes: { exclude: [] }, // TRAE TODOS LOS CAMPOS DE VENTAS
            });
            console.log("VENTA:", venta /* .dataValues */);
            //console.log("PRODUCTOS:", venta.Productos.map(p => p.dataValues));

            if (!venta) {
                return res.status(404).send("Venta no encontrada");
            }
            const ticket = {
                idticket: venta.id,
                fechaCompra: venta.fecha,
                productos: venta.Productos.map((prod) => ({
                    id: prod.id,
                    nombre: prod.nombre,
                    precio: prod.precio,
                    cantidad: prod.VentaProducto.cantidad,
                })),
                medioPago: venta.medio,
                total: venta.total,
                nombreCliente: venta.nombre,
                /*stotal: venta.Producto.precio * 1 ,
                cliente: venta.Usuario.nombre,
                emailCliente: venta.Usuario.mail,
                precioUnitario: venta.Producto.precio,
                cantidad: 1, // si no tienes columna cantidad
                total: venta.Producto.precio * 1 */
            };
            ticket.esVista = true;
            res.render("ticket", { ticket });
        } catch (error) {
            console.log(error);
            //res.status(500).send("Error interno del servidor");
        }
    },

    descargarticket: async (req, res) => {
        try {
            let ids = req.query.ids ? req.query.ids.split(",").map(Number) : [];
            const venta = await db.Ventas.findByPk(ids[0], {
                include: [{ model: db.Producto }],
            });

            if (!venta) {
                return res.status(404).send("Venta no encontrada");
            }

            const ticket = {
                idticket: venta.id,
                fechaCompra: venta.fecha,
                medioPago: venta.medio,
                total: venta.total,
                nombreCliente: venta.nombre,
                productos: venta.Productos.map((p) => ({
                    nombre: p.nombre,
                    precio: p.precio,
                    cantidad: p.VentaProducto.cantidad,
                })),
            };

            // 👉 1. Renderizar la vista a HTML (sin enviarla al navegador)
            const html = await new Promise((resolve, reject) => {
                res.render("ticketPDF", { ticket }, (err, html) => {
                    if (err) reject(err);
                    else resolve(html);
                });
            });

            const browser = await puppeteer.launch({
                headless: "new",
            });
            const page = await browser.newPage();

            await page.setContent(html, {
                waitUntil: "networkidle0",
            });

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
            });

            await browser.close();

            // 👉 3. Enviar PDF al navegador
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=ticket_${ticket.idticket}.pdf`);
            res.send(pdfBuffer);
        } catch (error) {
            console.error("Error al descargar el ticket:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = ticketController;
