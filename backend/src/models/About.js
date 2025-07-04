const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    // Hero Section
    heroContent: {
      title: {
        type: String,
        // required: true,
        default: "Yaaku Indigenous Tribe",
      },
      subtitle: {
        type: String,
        // required: true,
        default: "Guardians of Mukogodo Forest • Keepers of Ancient Wisdom",
      },
      statistics: [
        {
          label: {
            type: String,
            // required: true,
          },
          value: {
            type: String,
            // required: true,
          },
          color: {
            type: String,
            // required: true,
            enum: ["amber", "red", "orange", "emerald", "purple", "blue"],
          },
        },
      ],
    },

    // Images
    images: {
      hero: {
        type: String,
        // required: true,
      },
      objectives: [
        {
          type: String,
          // required: true,
        },
      ],
    },

    // Vision & Mission
    visionMission: {
      title: {
        type: String,
        // required: true,
        default: "Our Foundation",
      },
      subtitle: {
        type: String,
        // required: true,
        default: "The pillars that guide our community's journey forward",
      },
      vision: {
        title: {
          type: String,
          // required: true,
          default: "VISION",
        },
        color: {
          type: String,
          // required: true,
          default: "amber",
        },
        description: {
          type: String,
          // required: true,
        },
      },
      mission: {
        title: {
          type: String,
          // required: true,
          default: "MISSION",
        },
        color: {
          type: String,
          // required: true,
          default: "emerald",
        },
        description: {
          type: String,
          // required: true,
        },
      },
    },

    // Objectives
    objectives: {
      title: {
        type: String,
        // required: true,
        default: "Our Objectives",
      },
      subtitle: {
        type: String,
        // required: true,
        default:
          "Dedicated to preserving heritage, empowering communities, and protecting our sacred lands",
      },
      items: [
        {
          id: {
            type: String,
            // required: true,
          },
          title: {
            type: String,
            // required: true,
          },
          description: {
            type: String,
            // required: true,
          },
          icon: {
            type: String,
            // required: true,
          },
          color: {
            type: String,
            // required: true,
            enum: ["amber", "red", "orange", "emerald", "purple", "blue"],
          },
        },
      ],
    },

    // History Content
    historyContent: {
      title: {
        type: String,
        // required: true,
        default: "Background History",
      },
      subtitle: {
        type: String,
        // required: true,
        default:
          "From the Western slopes of Mount Kenya, the Yaaku people have been guardians of Mukogodo Forest for generations",
      },
      sections: [
        {
          id: {
            type: String,
            // required: true,
          },
          title: {
            type: String,
            // required: true,
          },
          content: {
            type: String,
            // required: true,
          },
          icon: {
            type: String,
          },
          color: {
            type: String,
            enum: ["amber", "red", "orange", "emerald", "purple", "blue"],
          },
          alwaysVisible: {
            type: Boolean,
            // default: false,
          },
        },
      ],
    },

    // Timeline Data
    timelineData: [
      {
        title: {
          type: String,
          // required: true,
        },
        description: {
          type: String,
          // required: true,
        },
        icon: {
          type: String,
          // required: true,
        },
        color: {
          type: String,
          // required: true,
          enum: ["amber", "red", "orange", "emerald", "purple", "blue"],
        },
      },
    ],

    // Call to Action
    callToAction: {
      title: {
        type: String,
        // required: true,
        default: "Join Our Mission",
      },
      subtitle: {
        type: String,
        // required: true,
        default:
          "Help us preserve the Yaaku heritage, protect Mukogodo Forest, and ensure our ancient wisdom survives for future generations.",
      },
      primaryButton: {
        text: {
          type: String,
          // required: true,
          default: "Support Our Cause",
        },
        icon: {
          type: String,
          // required: true,
          default: "Heart",
        },
      },
      secondaryButton: {
        text: {
          type: String,
          // required: true,
          default: "Learn More",
        },
        icon: {
          type: String,
          // required: true,
          default: "Camera",
        },
      },
      statistics: [
        {
          label: {
            type: String,
            // required: true,
          },
          value: {
            type: String,
            // required: true,
          },
          color: {
            type: String,
            // required: true,
            enum: ["amber", "red", "orange", "emerald", "purple", "blue"],
          },
        },
      ],
    },

    // Meta fields
    isActive: {
      type: Boolean,
      // default: true,
    },
    version: {
      type: String,
      default: "1.0",
    },
    lastUpdatedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
aboutSchema.index({ isActive: 1 });
aboutSchema.index({ createdAt: -1 });

// Static method to get active about content
aboutSchema.statics.getActiveContent = function () {
  return this.findOne({ isActive: true }).sort({ createdAt: -1 });
};

// Instance method to activate this version
aboutSchema.methods.activate = function () {
  return this.constructor
    .updateMany({ _id: { $ne: this._id } }, { isActive: false })
    .then(() => {
      this.isActive = true;
      return this.save();
    });
};

module.exports = mongoose.model("About", aboutSchema);
