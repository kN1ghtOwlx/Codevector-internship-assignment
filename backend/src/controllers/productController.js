const mongoose = require("mongoose");
const Product = require("../models/Product");
const { encodeCursor, decodeCursor } = require("../utils/cursor");

const MAX_LIMIT = 100;

function parseLimit(value) {
  const n = parseInt(value || "20", 10);
  if (!Number.isFinite(n) || n <= 0) return 20;
  return Math.min(n, MAX_LIMIT);
}

async function listProducts(req, res, next) {
  try {
    const limit = parseLimit(req.query.limit);
    const category = req.query.category ? String(req.query.category).trim() : "";

    let snapshotAt;
    let cursorData = null;

    if (req.query.cursor) {
      cursorData = decodeCursor(req.query.cursor);
      snapshotAt = new Date(cursorData.snapshotAt);
      if (Number.isNaN(snapshotAt.getTime())) {
        return res.status(400).json({ message: "Invalid cursor snapshotAt" });
      }
    } else {
      snapshotAt = new Date();
    }

    const filter = {
      updated_at: { $lte: snapshotAt },
    };

    if (category) {
      filter.category = category;
    }

    if (cursorData) {
      const lastUpdatedAt = new Date(cursorData.updatedAt);
      const lastId = new mongoose.Types.ObjectId(cursorData.id);

      if (Number.isNaN(lastUpdatedAt.getTime())) {
        return res.status(400).json({ message: "Invalid cursor updatedAt" });
      }

      filter.$or = [
        { updated_at: { $lt: lastUpdatedAt } },
        {
          updated_at: lastUpdatedAt,
          _id: { $lt: lastId },
        },
      ];
    }

    const docs = await Product.find(filter)
      .sort({ updated_at: -1, _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = docs.length > limit;
    const pageItems = hasMore ? docs.slice(0, limit) : docs;
    const lastItem = pageItems[pageItems.length - 1];

    const nextCursor =
      hasMore && lastItem
        ? encodeCursor({
            snapshotAt: snapshotAt.toISOString(),
            updatedAt: lastItem.updated_at.toISOString(),
            id: String(lastItem._id),
          })
        : null;

    return res.json({
      data: pageItems.map((p) => ({
        id: p._id,
        name: p.name,
        category: p.category,
        price: p.price,
        created_at: p.created_at,
        updated_at: p.updated_at,
      })),
      pageInfo: {
        hasMore,
        nextCursor,
        snapshotAt: snapshotAt.toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
};